import prisma from '../lib/prisma'
import { ConflictError, NotFoundError, UnauthorizedError, ValidationError } from '../types/Error'
import { ResponseMessage } from '../types/Message'
import { NewUser, UserResponse, UsersResponse } from '../types/Users'
import { comparePassword, hashPassword } from '../utils/encryption'

class UserService {
  async getAllUsers (): Promise<UsersResponse> {
    const users = await prisma.users.findMany({
      omit: {
        password: true,
        role_id: true
      },
      include: {
        role: true
      }
    })

    if (users.length === 0) {
      throw new NotFoundError('No se encontró ningún usuario')
    }

    return { users }
  }

  async getUser (userId: number): Promise<UserResponse> {
    const user = await prisma.users.findFirst({
      where: {
        user_id: userId
      },
      omit: {
        password: true,
        role_id: true
      },
      include: {
        role: true,
        inscriptionAsStudent: {
          include: {
            program: true,
            researcher: {
              select: {
                user_id: true,
                name: true,
                second_name: true,
                paternal_lastname: true,
                maternal_lastname: true
              }
            }
          },
          omit: {
            program_id: true,
            researcher_id: true
          },
          where: {
            active: true
          }
        },
        inscriptionAsResearcher: {
          include: {
            program: true
          },
          omit: {
            program_id: true
          },
          where: {
            active: true
          }
        }
      }
    })

    if (user === null) {
      throw new NotFoundError('No se encontró ningún usuario con ese id')
    }

    return { user }
  }

  async createUser (userData: NewUser): Promise<UserResponse> {
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

    const newUser = await prisma.users.create({
      data: {
        ...userData,
        password: hashedPassword
      },
      omit: {
        password: true,
        role_id: true
      },
      include: {
        role: true
      }
    })

    return { user: newUser }
  }

  async updateUser (userId: number, userData: NewUser): Promise<UserResponse> {
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

    return { user: updatedUser }
  }

  async deleteUser (userId: number): Promise<ResponseMessage> {
    await this.getUser(userId)

    await prisma.inscriptions.deleteMany({
      where: {
        OR: [
          { student_id: userId },
          { researcher_id: userId }
        ]
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
      throw new UnauthorizedError('Contraseña incorrecta')
    }
  }
}

export default new UserService()
