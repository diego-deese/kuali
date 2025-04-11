import jwt from '../lib/jwt'
import crypto from '../lib/crypto'
import { ValidationError } from '../types/Error'
import { SessionTokens } from '../types/RefreshToken'
import { Users } from '../generated/client'

const KEYPHRASE = process.env.KEYPHRASE
const ENVIRONMENT = process.env.ENVIRONMENT ?? 'production'

export const generateAccessToken = (user: Users): string => {
  if (KEYPHRASE !== undefined) {
    return jwt.sign({ institutional_email: user.institutional_email, user_id: user.user_id, user_role: user.role_id }, KEYPHRASE, {
      expiresIn: ENVIRONMENT === 'dev' ? '10h' : '2h'
    })
  } else {
    throw new ValidationError('No se definió una frase secreta para generar el token')
  }
}

export const generateRefreshToken = (): string => {
  const token = crypto.randomBytes(16).toString('base64url')
  return token
}

export const hashToken = (token: string): string => {
  return crypto.createHash('sha512').update(token).digest('hex')
}

export const generateTokens = (user: Users): SessionTokens => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken()
  const hashedRefreshToken = hashToken(refreshToken)

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    hashedRefresh_token: hashedRefreshToken
  }
}

export const verifyToken = (token: string): undefined => {
  try {
    if (KEYPHRASE !== undefined) {
      jwt.verify(token, KEYPHRASE)
    } else {
      throw new ValidationError('No se definió una frase secreta para generar el token')
    }
  } catch (error) {
    throw new ValidationError('Token verification failed')
  }
}
