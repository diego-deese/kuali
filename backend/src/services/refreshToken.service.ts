import { RefreshToken } from '../generated/client'
import prisma from '../lib/prisma'
import { hashToken } from '../utils/jwt'

class RefreshTokenService {
  async addRefreshTokenToWhitelist (refreshToken: string, userId: number): Promise<RefreshToken> {
    const addedRefreshToken = await prisma.refreshToken.create({
      data: {
        hashedToken: hashToken(refreshToken),
        user_id: userId,
        expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days
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
}

export default new RefreshTokenService()
