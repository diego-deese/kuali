import { Response } from 'express'
import { AuthRequest } from '../types/Request'
import { parseId } from '../utils/parsing/shared'
import registrationService from '../services/registration.service'
import { AppError } from '../types/Error'

class RegistrationController {
  async createRegistration (req: AuthRequest, res: Response): Promise<void> {
    try {
      if (req.user === undefined) {
        res.status(403).json({
          message: 'Error al registrar al usuario a el evento o convocatoria',
          error: 'Usuario no autenticado'
        })
        return
      }

      const activityId = parseId(req.params.activityId, 'El id del evento o convocatoria no fue proporcionado o tiene un formato inválido')

      const registration = await registrationService.createRegistration(req.user.user_id, activityId)

      res.status(201).json({ registration })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al registrar al usuario al evento o convocatoria',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al registrar al usuario al evento o convocatoria',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  async deleteRegistration (req: AuthRequest, res: Response): Promise<void> {
    try {
      if (req.user === undefined) {
        res.status(403).json({
          message: 'Error al borrar el registro del usuario al evento o convocatoria',
          error: 'Usuario no autenticado'
        })
        return
      }

      const activityId = parseId(req.params.activityId, 'El id del evento o convocatoria no fue proporcionado o tiene un formato inválido')

      const registrationDeleted = await registrationService.deleteRegistration(req.user.user_id, activityId)

      if (registrationDeleted) {
        res.status(200).json({ message: 'El registro del usuario al evento o convocatoria y sus documentos subidos fueron borrados exitosamente' })
        return
      }

      res.status(403).json({
        message: 'Error al borrar el registro del usuario al evento o convocatoria',
        error: 'No se pudo borrar el registro del usuario al evento o convocatoria'
      })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al borrar el registro del usuario al evento o convocatoria',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al borrar el registro del usuario al evento o convocatoria',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }
}

export default new RegistrationController()
