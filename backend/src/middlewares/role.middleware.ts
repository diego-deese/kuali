import { Response, NextFunction } from 'express'
import { AuthRequest } from '../types/Request'
import { ADMIN_ROLE_ID, RESEARCHER_ROLE_ID, STUDENT_ROLE_ID } from '../constants/roles'

export const hasRole = (allowedRoles: number[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (req.user == null) {
      res.status(403).json({
        message: 'Error al validar el rol del usuario',
        error: 'Usuario no autenticado'
      })
      return
    }

    if (!allowedRoles.includes(req.user.role_id)) {
      res.status(403).json({
        message: 'Error al validar el rol del usuario',
        error: 'No tienes permisos para acceder a este recurso'
      })
      return
    }

    next()
  }
}

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if ((req.user == null) || req.user.role_id !== ADMIN_ROLE_ID) {
    res.status(403).json({
      message: 'Error al validar el rol del usuario',
      error: 'Acceso restringido a administradores'
    })
    return
  }

  next()
}

export const isResearcher = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if ((req.user == null) || req.user.role_id !== RESEARCHER_ROLE_ID) {
    res.status(403).json({
      message: 'Error al validar el rol del usuario',
      error: 'Acceso restringido a investigadores'
    })
    return
  }

  next()
}

export const isStudent = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if ((req.user == null) || req.user.role_id !== STUDENT_ROLE_ID) {
    res.status(403).json({
      message: 'Error al validar el rol del usuario',
      error: 'Acceso restringido a estudiantes'
    })
    return
  }

  next()
}
