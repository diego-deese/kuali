import { NextFunction, Response } from 'express'
import jwt from '../lib/jwt'
import { AppError, UnauthorizedError } from '../types/Error'
import { KEYPHRASE } from '../constants/env'
import { AuthRequest, UserPayload } from '../types/Request'

export const isAuthenticated = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const { authorization } = req.headers

  if (authorization === undefined || !authorization.startsWith('Bearer ')) {
    res.status(401)
    throw new UnauthorizedError('Token no proporcionado')
  }

  try {
    const token = authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload

    if (KEYPHRASE === undefined) {
      res.status(400).json({
        message: 'Error al validar el token de acceso',
        error: 'No se proporcionó la frase secreta para validar el token'
      })
      return
    }

    req.user = { user_id: decoded.user_id, institutional_email: decoded.institutional_email, role_id: decoded.role_id }
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        message: 'Error validando el token',
        error: error.message
      })
    } else {
      res.status(500).json({
        message: 'Error validando el token',
        error: error instanceof Error ? error.message : 'Error desconocido'
      })
    }
  }

  return next()
}
