import jwt from '../lib/jwt'
import { ValidationError } from '../types/Error'
import { SessionTokens } from '../types/Auth'
import { SafeUser } from '../types/Users'

const KEYPHRASE = process.env.KEYPHRASE
// const ENVIRONMENT = process.env.ENVIRONMENT ?? 'production'

export const generateAccessToken = (user: SafeUser): string => {
  if (KEYPHRASE !== undefined) {
    return jwt.sign({ institutional_email: user.institutional_email, user_id: user.user_id, user_role: user.role.role_id }, KEYPHRASE, {
      expiresIn: '5m'
    })
  } else {
    throw new ValidationError('No se definió una frase secreta para generar el token')
  }
}

export const generateRefreshToken = (user: SafeUser): string => {
  if (KEYPHRASE !== undefined) {
    return jwt.sign(
      {
        institutional_email: user.institutional_email,
        user_id: user.user_id,
        user_role: user.role.role_id
      },
      KEYPHRASE,
      {
        expiresIn: '7d'
      }
    )
  } else {
    throw new ValidationError('No se definió una frase secreta para generar el token')
  }
}

export const generateTokens = (user: SafeUser): SessionTokens => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  return {
    access_token: accessToken,
    refresh_token: refreshToken
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
