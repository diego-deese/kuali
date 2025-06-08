import { /* Request, */ Response } from 'express'
import { AuthRequest } from '../types/Request'
import { parseId } from '../utils/parsing/shared'
import notificationService from '../services/notification.service'
import { AppError } from '../types/Error'

class NotificationController {
  async getUserNotifications (req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = parseId(req.user?.user_id, 'El usuario no está autenticado o su id tiene un formato inválido')

      const notifications = await notificationService.getUserNotifications(userId)

      res.status(200).json({ notifications })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al obtener las notificaciones del usuario',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al obtener las notificaciones del usuario',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }
}

export default new NotificationController()
