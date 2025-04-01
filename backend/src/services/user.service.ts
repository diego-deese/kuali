import prisma from '../lib/prisma'
import { NewUser, UserResponse, UsersResponse } from '../types/Users'
import { hash } from 'bcrypt'

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

    return { users }
  }

  async getUser (id: number): Promise<UserResponse> {
    const user = await prisma.users.findFirst({
      where: {
        user_id: id
      },
      omit: {
        password: true,
        role_id: true
      },
      include: {
        role: true
      }
    })

    return { user }
  }

  async createUser (userData: NewUser): Promise<UserResponse | undefined> {
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          { institutional_email: userData.institutional_email },
          { personal_email: userData.personal_email }
        ]
      }
    })

    if (existingUser !== null) {
      throw new Error('Ya existe un usuario con este correo institucional o personal')
    }

    const hashedPassword = await hash(userData.password, 10)

    const newUser = await prisma.users.create({
      data: {
        ...userData,
        password: hashedPassword
      }
    })

    const { password, ...userWithoutPassword } = newUser

    return { user: userWithoutPassword }
  }
}

export default new UserService()
