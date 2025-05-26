import prisma from '../lib/prisma'
import { AcademicProgramWithStudents } from '../types/AcademicProgram'
import { ConflictError, ForbiddenError, NotFoundError, ValidationError } from '../types/Error'
import { ResponseMessage } from '../types/Message'
import { NewUser, SafeUser, UserProfilePhoto } from '../types/Users'
import { comparePassword, hashPassword } from '../utils/encryption'

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
          { personal_email: userData.personal_email }
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
      include: {
        role: true
      }
    })
    return newUser
  }

  async updateUser (userId: number, userData: NewUser): Promise<SafeUser> {
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

    if (userData.personal_email !== undefined) {
      const perEmailExists = await prisma.users.findFirst({
        where: {
          personal_email: userData.personal_email,
          user_id: { not: userId }
        }
      })

      console.log(perEmailExists)

      if (perEmailExists !== null) {
        throw new ConflictError('Ya existe un usuario con ese correo personal')
      }
    }

    const dataToUpdate = { ...userData }

    if (userData.password !== undefined) {
      dataToUpdate.password = await hashPassword(userData.password)
    }

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
        role_id: true
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
          select: {
            students: {
              select: {
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
}

export default new UserService()
