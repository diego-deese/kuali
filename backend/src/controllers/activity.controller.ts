import { Request, Response } from 'express'
import activityService from '../services/activity.service'
import { AppError } from '../types/Error'
import { isNumber } from '../utils/parsing'

class ActivityController {
  async getActivities (_req: Request, res: Response): Promise<undefined> {
    try {
      const response = await activityService.getActivities()

      res.status(200).json(response)
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

  async getActivity (req: Request, res: Response): Promise<undefined> {
    try {
      const { id } = req.params

      if (!isNumber(id)) {
        res.status(400).json({
          message: 'Error al obtener el evento o convocatoria',
          error: 'El id proporcionado de la actividad es inválido'
        })
      } else {
        const response = await activityService.getActivity(Number(id))

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
      const { id } = req.params

      if (!isNumber(id)) {
        res.status(400).json({
          message: 'Error al obtener el evento o convocatoria',
          error: 'El id proporcionado es inválido'
        })
      } else {
        await activityService.deleteActivity(Number(id))

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
      const { id } = req.params

      if (!isNumber(id)) {
        res.status(400).json({
          message: 'Error al obtener el evento o convocatoria',
          error: 'El id proporcionado es inválido'
        })
      } else {
        const upcomingUserActivities = await activityService.getUserUpcomingActivities(Number(id))

        res.status(200).json({ activities: upcomingUserActivities })
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

  async getUserPastActivities (req: Request, res: Response): Promise<undefined> {
    try {
      const { id } = req.params

      if (!isNumber(id)) {
        res.status(400).json({
          message: 'Error al obtener el evento o convocatoria',
          error: 'El id proporcionado es inválido'
        })
      } else {
        const pastUserActivities = await activityService.getUserPastActivities(Number(id))

        res.status(200).json({ activities: pastUserActivities })
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

  async getUpcomingActivities (_req: Request, res: Response): Promise<undefined> {
    try {
      const upcomingActivities = await activityService.getUpcomingActivities()

      res.status(200).json({ activities: upcomingActivities })
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
}

export default new ActivityController()
