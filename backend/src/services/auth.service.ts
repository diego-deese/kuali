import prisma from '../lib/prisma'
import { comparePassword } from '../utils/encryption'
import { generateTokens } from '../utils/jwt'
import refreshTokenService from './refreshToken.service'
import { UnauthorizedError, NotFoundError } from '../types/Error'
import { UserSession } from '../types/RefreshToken'

export class AuthService {
  async login (institutionalEmail: string, password: string): Promise<UserSession> {
    const user = await prisma.users.findUnique({
      where: {
        institutional_email: institutionalEmail
      },
      include: {
        role: true
      }
    })

    if (user === null) throw new NotFoundError('No existe un usuario con ese correo institucional')

    const isPasswordValid = await comparePassword(password, user.password)
    if (isPasswordValid !== true) throw new UnauthorizedError('La contraseña introducida es incorrecta')

    const sessionTokens = generateTokens(user)

    await refreshTokenService.addRefreshTokenToWhitelist(sessionTokens.refresh_token, user.user_id)

    return {
      access_token: sessionTokens.access_token,
      refresh_token: sessionTokens.refresh_token,
      user_id: user.user_id,
      role: user.role
    }
  }
}

export default new AuthService()
