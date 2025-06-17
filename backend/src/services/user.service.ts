import prisma from '../lib/prisma'
import { STUDENT_ROLE_ID, ADMIN_ROLE_ID, RESEARCHER_ROLE_ID } from '../constants/roles'
import { AcademicProgramWithStudents } from '../types/AcademicProgram'
import { ConflictError, ForbiddenError, NotFoundError, ValidationError } from '../types/Error'
import { ResponseMessage } from '../types/Message'
import { NewUser, SafeUser, UserProfilePhoto, UpdatedUser } from '../types/Users'
import { comparePassword, hashPassword } from '../utils/encryption'
import inscriptionService from './inscription.service'
import academicProgramService from './academic-program.service'

class UserService {
  async getAllUsers (): Promise<SafeUser[]> {
    const users = await prisma.users.findMany({
      omit: {
        password: true,
        role_id: true,
        profile_photo: true,
        photo_mime_type: true
      },
      include: {
        role: true,
        academic_programs_as_student: {
          select: {
            program: true
          },
          where: {
            active: true
          }
        },
        academic_programs_as_researcher: {
          omit: {
            researcher_id: true
          }
        }
      },
      orderBy: {
        active: 'desc'
      }
    })

    return users
  }

  async getUser (userId: number): Promise<SafeUser> {
    const user = await prisma.users.findFirst({
      where: {
        user_id: userId
      },
      omit: {
        password: true,
        role_id: true,
        profile_photo: true,
        photo_mime_type: true
      },
      include: {
        role: true,
        academic_programs_as_student: {
          select: {
            program: true
          },
          where: {
            active: true
          }
        },
        academic_programs_as_researcher: {
          omit: {
            researcher_id: true
          }
        }
      }
    })

    if (user === null) {
      throw new NotFoundError('No se encontró a ningún usuario con ese id')
    }

    return user
  }

  async createUser (userData: NewUser): Promise<SafeUser> {
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          { institutional_email: userData.institutional_email },
          userData.personal_email !== null ? { personal_email: userData.personal_email } : {}
        ]
      }
    })

    if (existingUser !== null) {
      throw new ConflictError('Ya existe un usuario con este correo institucional o personal')
    }

    const hashedPassword = await hashPassword(userData.password)

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { role_id, ...userDataWithoutRole } = userData // separa el role de los datos del usuario para poder conectarlo

    const newUser = await prisma.users.create({
      data: {
        ...userDataWithoutRole,
        password: hashedPassword,
        role: {
          connect: {
            // eslint-disable-next-line object-shorthand
            role_id: role_id
          }
        }
      },
      omit: {
        profile_photo: true,
        photo_mime_type: true
      },
      include: {
        role: true
      }
    })
    return newUser
  }

  async updateUser (userId: number, userData: Partial<UpdatedUser>): Promise<SafeUser> {
    const existingUser = await prisma.users.findFirst({
      where: {
        user_id: userId
      }
    })

    if (existingUser === null) {
      throw new ValidationError('No existe un usuario con ese id')
    }

    if (userData.institutional_email !== undefined) {
      const instEmailExists = await prisma.users.findFirst({
        where: {
          institutional_email: userData.institutional_email,
          user_id: { not: userId }
        }
      })

      if (instEmailExists !== null) {
        throw new ConflictError('Ya existe un usuario con ese correo institucional')
      }
    }

    const dataToUpdate = { ...userData }

    const updatedUser = await prisma.users.update({
      where: {
        user_id: userId
      },
      data: dataToUpdate,
      include: {
        role: true
      },
      omit: {
        password: true,
        role_id: true,
        profile_photo: true,
        photo_mime_type: true
      }
    })

    return updatedUser
  }

  async deleteUser (userId: number): Promise<ResponseMessage> {
    await this.getUser(userId)

    await prisma.inscriptions.deleteMany({
      where: { student_id: userId }
    })

    await prisma.academicPrograms.updateMany({
      where: {
        researcher_id: userId
      },
      data: {
        researcher_id: undefined
      }
    })

    await prisma.users.delete({
      where: {
        user_id: userId
      }
    })

    return { message: 'Usuario eliminado correctamente' }
  }

  async updatePasswordWithValidation (userId: number, actualPassword: string, newPassword: string): Promise<ResponseMessage> {
    const existingUser = await prisma.users.findFirst({
      where: {
        user_id: userId
      }
    })

    if (existingUser === null) {
      throw new ValidationError('No existe un usuario con ese id')
    }

    const bothPasswordsAreEqual = await comparePassword(actualPassword, existingUser.password)

    if (bothPasswordsAreEqual === true) {
      const hashedNewPass = await hashPassword(newPassword)
      await prisma.users.update({
        where: {
          user_id: userId
        },
        data: { password: hashedNewPass }
      })
      return { message: 'Contraseña del usuario actualizada correctamente' }
    } else {
      throw new ForbiddenError('Contraseña incorrecta')
    }
  }

  async getUserProfilePhoto (userId: number): Promise<UserProfilePhoto> {
    const user = await prisma.users.findFirst({
      select: {
        profile_photo: true,
        photo_mime_type: true
      },
      where: {
        user_id: userId
      }
    })

    if (user === null) {
      throw new NotFoundError('No existe un usuario con ese id')
    }

    return user
  }

  async getUserState (userId: number): Promise<ResponseMessage> {
    const userState = await prisma.inscriptions.findFirst(
      {
        select: {
          active: true
        },
        where: {
          student_id: userId
        }
      })

    if ((userState?.active) ?? false) {
      return { message: 'active' }
    } else {
      return { message: 'inactive' }
    }
  }

  async getResearcherStudentsWithAcademicProgram (userId: number): Promise<AcademicProgramWithStudents[]> {
    const studentsWithProgramsRaw = await prisma.academicPrograms.findMany({
      where: {
        researcher_id: userId
      },
      select: {
        program_id: true,
        name: true,
        inscriptions: {
          where: {
            active: true
          },
          select: {
            students: {
              select: {
                user_id: true,
                name: true,
                second_name: true,
                paternal_lastname: true,
                maternal_lastname: true,
                identifier: true,
                institutional_email: true
              }
            }
          }
        }
      }
    })

    const studentsWithPrograms = studentsWithProgramsRaw.map(program => ({
      name: program.name,
      students: program.inscriptions.map(inscription => inscription.students)
    }))

    return studentsWithPrograms
  }

  async deactivateStudent (userId: number): Promise<void> {
    await inscriptionService.deactivateStudentInscriptions(userId)

    await prisma.users.update({
      where: {
        user_id: userId
      },
      data: {
        active: false
      }
    })
  }

  async deactivateResearcher (userId: number): Promise<void> {
    await academicProgramService.unassignResearcherFromAllPrograms(userId)
  }

  async deactivateUser (userId: number): Promise<void> {
    const user = await this.getUser(userId)

    if (user.role.role_id === STUDENT_ROLE_ID) {
      await this.deactivateStudent(userId)
    } else if (user.role.role_id === RESEARCHER_ROLE_ID) {
      await this.deactivateResearcher(userId)
    } else {
      await prisma.users.update({
        where: {
          user_id: userId
        },
        data: {
          active: false
        }
      })
    }
  }

  async assignStudent (academicProgramId: number, studentId: number): Promise<ResponseMessage> {
    const user = await this.getUser(studentId)
    if (user.role.role_id !== STUDENT_ROLE_ID) {
      throw new ValidationError('El usuario con el id proporcionado no es un estudiante')
    }

    await prisma.inscriptions.updateMany({
      where: {
        student_id: studentId,
        active: true
      },
      data: {
        active: false,
        end_date: new Date()
      }
    })
    await prisma.inscriptions.create({
      data: {
        student_id: studentId,
        program_id: academicProgramId,
        active: true,
        start_date: new Date(),
        end_date: new Date('2099-12-31') // no c xd
      }
    })

    await prisma.users.update({
      where: {
        user_id: studentId
      },
      data: {
        active: true
      }
    })

    return {
      message: 'Estudiante inscrito con éxito'
    }
  }

  async deleteAdmin (adminId: number): Promise<ResponseMessage> {
    const user = await this.getUser(adminId)
    if (user.role.role_id !== ADMIN_ROLE_ID) {
      throw new ValidationError('El usuario con el id proporcionado no es un administrador')
    }

    await prisma.users.update({
      where: {
        user_id: adminId
      },
      data: {
        active: false
      }
    })

    return {
      message: 'Cuenta de administrador desactivada'
    }
  }
}

export default new UserService()
