import prisma from '../lib/prisma'
import { comparePassword, hashToken } from '../utils/encryption'
import { generateTokens } from '../utils/jwt'
import { UnauthorizedError, NotFoundError } from '../types/Error'
import { UserSession } from '../types/Auth'
import { RefreshToken } from '../generated/client'

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

    await this.addRefreshTokenToWhitelist(sessionTokens.refresh_token, user.user_id)

    return {
      tokens: sessionTokens,
      user: {
        user_id: user.user_id,
        role: user.role
      }
    }
  }

  async addRefreshTokenToWhitelist (refreshToken: string, userId: number): Promise<RefreshToken> {
    const addedRefreshToken = await prisma.refreshToken.create({
      data: {
        hashedToken: hashToken(refreshToken),
        user_id: userId
      }
    })

    return addedRefreshToken
  }

  async findRefreshToken (token: string): Promise<RefreshToken | null> {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: {
        hashedToken: hashToken(token)
      }
    })

    return refreshToken
  }

  async revokeTokens (userId: number): Promise<undefined> {
    await prisma.refreshToken.updateMany({
      where: { user_id: userId },
      data: { revoked: true }
    })
  }

  async deleteRefreshToken (id: string): Promise<undefined> {
    await prisma.refreshToken.delete({
      where: { id }
    })
  }
}

export default new AuthService()
