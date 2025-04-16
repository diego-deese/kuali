import { NextFunction, Response } from 'express'
import jwt from '../lib/jwt'
import { KEYPHRASE } from '../constants/env'
import { AuthRequest, UserPayload } from '../types/Request'

export const isAuthenticated = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const { authorization } = req.headers

  if (authorization === undefined || !authorization.startsWith('Bearer ')) {
    res.status(401).json({
      message: 'Error al validar el token',
      error: 'Token no proporcionado'
    })
    return
  }

  try {
    const token = authorization.split(' ')[1]

    if (KEYPHRASE === undefined) {
      res.status(400).json({
        message: 'Error al validar el token',
        error: 'No se proporcionó la frase secreta para validar el token'
      })
      return
    }

    const decoded = jwt.verify(token, KEYPHRASE) as UserPayload

    req.user = { user_id: decoded.user_id, institutional_email: decoded.institutional_email, role_id: decoded.role_id }
    next()
  } catch (error) {
    if (error instanceof Error && error.name === 'TokenExpiredError') {
      res.status(401).json({
        message: 'Error al validar el token',
        error: 'Token expirado'
      })
    } else {
      res.status(500).json({
        message: 'Error al validar el token',
        error: error instanceof Error ? error.message : 'Error desconocido'
      })
    }
  }
}
