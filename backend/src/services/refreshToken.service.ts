import prisma from '../lib/prisma';
import { hashToken } from '../utils/jwt';

export async function addRefreshTokenToWhitelist({ refreshToken, user_id }: { refreshToken: string; user_id: number }) {
  return prisma.refreshToken.create({
    data: {
      hashedToken: hashToken(refreshToken),
      user_id,
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
    },
  });
}

export async function findRefreshToken(token: string) {
  return prisma.refreshToken.findUnique({
    where: {
      hashedToken: hashToken(token), 
    },
  });
}

export async function revokeTokens(user_id: number) {
  return prisma.refreshToken.updateMany({
    where: { user_id },
    data: { revoked: true }, 
  });
}
