import { Request, Response } from 'express'
import activityService from '../services/activity.service'
import { AppError } from '../types/Error'
import { isNumber } from '../utils/parsing'
import { AuthRequest } from '../types/Request'
import { ADMIN_ROLE_ID } from '../constants/roles'

class ActivityController {
  async getActivities (req: AuthRequest, res: Response): Promise<void> {
    try {
      // Si el usuario está autenticado y tiene un rol asignado
      if (req.user?.role_id != null) {
        let activities

        if (req.user.role_id === ADMIN_ROLE_ID) {
          activities = await activityService.getActivities()
        } else {
          activities = await activityService.getActivitiesByRole(req.user.role_id)
        }

        // Obtener actividades filtradas por rol
        res.status(200).json({ activities })
      } else {
        res.status(403).json({
          message: 'Error al obtener los eventos y convocatorias',
          error: 'Usuario no autenticado o sin rol asignado'
        })
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al obtener los eventos y convocatorias',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al obtener los eventos y convocatorias',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  async getActivity (req: AuthRequest, res: Response): Promise<undefined> {
    try {
      const { activityId } = req.params

      if (!isNumber(activityId)) {
        res.status(400).json({
          message: 'Error al obtener el evento o convocatoria',
          error: 'El id proporcionado de la actividad es inválido'
        })
        return
      }

      if (req.user === null) {
        res.status(403).json({
          message: 'Error al obtener el evento o convocatoria',
          error: 'Usuario no autenticado'
        })
        return
      }

      if (req.user?.user_id !== undefined) {
        const response = await activityService.getActivityWithUserDetails(+activityId, req.user.user_id)

        res.status(200).json(response)
      } else {
        res.status(403).json({
          message: 'Error al obtener el evento o convocatoria',
          error: 'Usuario no autenticado'
        })
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al obtener los eventos y convocatorias',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al obtener los eventos y convocatorias',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  async getActivityWithUserDetails (req: Request, res: Response): Promise<undefined> {
    try {
      const { activityId, userId } = req.params

      if (!isNumber(activityId)) {
        res.status(400).json({
          message: 'Error al obtener el evento o convocatoria',
          error: 'El id proporcionado de la actividad es inválido'
        })
      } else if (!isNumber(userId)) {
        res.status(400).json({
          message: 'Error al obtener el evento o convocatoria',
          error: 'El id proporcionado del usuario es inválido'
        })
      } else {
        const response = await activityService.getActivityWithUserDetails(Number(activityId), Number(userId))

        res.status(200).json(response)
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al obtener los eventos y convocatorias',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al obtener los eventos y convocatorias',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  async createActivity (req: Request, res: Response): Promise<undefined> {
    try {
      const newActivity = req.body

      const createdActivity = await activityService.createActivity(newActivity)

      res.status(200).json({ activity: createdActivity })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al crear el evento o convocatoria',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al crear el evento o convocatoria',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  async deleteActivity (req: Request, res: Response): Promise<undefined> {
    try {
      const { activityId } = req.params

      if (!isNumber(activityId)) {
        res.status(400).json({
          message: 'Error al obtener el evento o convocatoria',
          error: 'El id proporcionado es inválido'
        })
      } else {
        await activityService.deleteActivity(+activityId)

        res.status(200).json({ message: 'Evento o convocatoria borrada correctamente' })
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al borrar el evento o convocatoria',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al borrar el evento o convocatoria',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  async getUserUpcomingActivities (req: Request, res: Response): Promise<undefined> {
    try {
      const { userId } = req.params

      if (!isNumber(userId)) {
        res.status(400).json({
          message: 'Error al obtener los eventos o convocatorias',
          error: 'El id proporcionado es inválido'
        })
      } else {
        const upcomingUserActivities = await activityService.getUserUpcomingActivities(+userId)

        res.status(200).json({ activities: upcomingUserActivities })
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al obtener los eventos o convocatorias',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al obtener los eventos o convocatorias',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  async getUserPastActivities (req: Request, res: Response): Promise<undefined> {
    try {
      const { userId } = req.params

      if (!isNumber(userId)) {
        res.status(400).json({
          message: 'Error al obtener los eventos o convocatorias',
          error: 'El id proporcionado es inválido'
        })
      } else {
        const pastUserActivities = await activityService.getUserPastActivities(+userId)

        res.status(200).json({ activities: pastUserActivities })
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al obtener los eventos o convocatorias',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al obtener los eventos o convocatorias',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  async getUpcomingActivities (_req: Request, res: Response): Promise<undefined> {
    try {
      const upcomingActivities = await activityService.getUpcomingActivities()

      res.status(200).json({ activities: upcomingActivities })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al obtener los eventos o convocatorias',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al obtener los eventos o convocatorias',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  async getActivityPoster (req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      if (!isNumber(id)) {
        res.status(400).json({
          message: 'Error al obtener el poster del evento o convocatoria',
          error: 'El id proporcionado es inválido'
        })
        return
      }

      const posterInfo = await activityService.getActivityPoster(+id)

      if (posterInfo.poster_image !== null) {
        const imageBuffer = Buffer.isBuffer(posterInfo.poster_image)
          ? posterInfo.poster_image
          : Buffer.from(posterInfo.poster_image)

        res.setHeader('Content-type', posterInfo.poster_mimetype ?? 'image/jpg')
        res.setHeader('Content-Length', imageBuffer.length)

        res.end(imageBuffer)
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al obtener el poster del evento o convocatoria',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al obtener el poster del evento o convocatoria',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }
}

export default new ActivityController()
