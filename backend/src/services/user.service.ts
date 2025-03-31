import prisma from '../lib/prisma'
import { Users } from '../generated/client'

type SafeUsers = Omit<Users, 'password'>

class UserService {
  async getAllUsers (): Promise<SafeUsers[]> {
    return await prisma.users.findMany({
      omit: {
        password: true
      }
    })
  }
}

export default new UserService()
