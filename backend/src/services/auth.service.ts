import prisma from '../lib/prisma'
import { comparePassword } from '../utils/encryption'
import { generateTokens } from '../utils/jwt'
import { SafeUser } from '../types/Users'
import { addRefreshTokenToWhitelist } from './refreshToken.service'
import { UnauthorizedError, NotFoundError } from '../types/Error'

export class AuthService {
  async login(institutional_email: string, password: string) {
    if (!institutional_email) {
      throw new UnauthorizedError('Correo institucional es requerido')
    }

    const user = await prisma.users.findUnique({
      where: { institutional_email: institutional_email }
    })

    if (!user) throw new NotFoundError('Correo no registrado')

    const isPasswordValid = await comparePassword(password, user.password)
    if (!isPasswordValid) throw new UnauthorizedError('Credenciales invalidas')

    const { accessToken, refreshToken } = generateTokens(user as SafeUser)

    await addRefreshTokenToWhitelist({ refreshToken, user_id: user.user_id })

    return { accessToken, refreshToken }
  }
}

export default new AuthService()
