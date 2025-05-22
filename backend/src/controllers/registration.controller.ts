import { Request, Response } from 'express'
import registrationService from '../services/registration.service'
import { AppError } from '../types/Error'
import { isNumber } from '../utils/validations'

class RegistrationController {
  getAllUsersByActivity = async (req: Request, res: Response): Promise<void> => {
    try {
      const { activity_id } = req.params

      if (!isNumber(activity_id)) {
        res.status(400).json({
          message: 'Error al obtener los usuarios registrados',
          error: 'El ID de la actividad no es válido'
        })
        return
      }

      const users = await registrationService.getAllUsersByActivity(Number(activity_id))
      res.status(200).json(users)
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al obtener los usuarios registrados',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error inesperado en getAllUsersByActivity',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }
}

export default new RegistrationController()
