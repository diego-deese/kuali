import { Request, Response } from 'express'
import activityService from '../services/activity.service'
import { AppError } from '../types/Error'
import { isNumber } from '../utils/validations'
import { AuthRequest } from '../types/Request'
import { ADMIN_ROLE_ID } from '../constants/roles'
import { ActivityRequirement } from '../types/Requirement'
import { toNewActivity, toUpdateActivity } from '../utils/parsing/Activity'
import { parseId } from '../utils/parsing/shared'

class ActivityController {
  async getActivities (req: AuthRequest, res: Response): Promise<void> {
    try {
      // Si el usuario está autenticado y tiene un rol asignado
      if (req.user === undefined) {
        res.status(403).json({
          message: 'Error al obtener los eventos y convocatorias',
          error: 'Usuario no autenticado o sin rol asignado'
        })
        return
      }

      let activities

      if (req.user.role_id === ADMIN_ROLE_ID) {
        activities = await activityService.getActivities()
      } else {
        activities = await activityService.getActivitiesByRole(req.user.role_id)
      }

      // Obtener actividades filtradas por rol
      res.status(200).json({ activities })
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

      if (req.user === undefined) {
        res.status(403).json({
          message: 'Error al obtener el evento o convocatoria',
          error: 'Usuario no autenticado'
        })
        return
      }

      const activity = await activityService.getActivityWithUserDetails(+activityId, req.user.user_id)

      res.status(200).json({ activity })
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

  async createActivity (req: AuthRequest, res: Response): Promise<undefined> {
    try {
      if (req.user === undefined) {
        res.status(403).json({
          message: 'Error al crear el evento o convocatoria',
          error: 'Usuario no autenticado'
        })
        return
      }

      if (req.files === undefined || !('poster_image' in req.files)) {
        res.status(400).json({
          message: 'Error al crear el evento o convocatoria',
          error: 'No se proporcionó la imagen del poster del evento'
        })
        return
      }

      const posterFile = req.files.poster_image[0]

      const newActivityDataRaw = JSON.parse(req.body.activityData)

      // If the activity doesn't has requirements, then we don't check the files and continue
      if (newActivityDataRaw.requirements === undefined) {
        const newActivityData = toNewActivity({
          ...newActivityDataRaw,
          admin_creator_id: req.user.user_id,
          category_id: 2,
          poster_image: posterFile.buffer,
          poster_mimetype: posterFile.mimetype
        })

        const createdActivity = await activityService.createActivity(newActivityData)

        res.status(201).json({ activity: createdActivity })
        return
      }

      // Obtain all the requirements that require a template
      const requirementsWithTemplate: ActivityRequirement[] = newActivityDataRaw.requirements.filter((req: ActivityRequirement) => req.template !== undefined)

      if (requirementsWithTemplate.length === 0) {
        // Build the new activity data
        const newActivityData = toNewActivity({
          ...newActivityDataRaw,
          admin_creator_id: req.user.user_id,
          category_id: 1,
          poster_image: posterFile.buffer,
          poster_mimetype: posterFile.mimetype
        })

        const createdActivity = await activityService.createActivity(newActivityData)

        res.status(201).json({ activity: createdActivity })
        return
      }

      const templateFiles = req.files.template_files

      // If the activity has requirements, then we check for the template_files array
      if (templateFiles === undefined || !Array.isArray(templateFiles)) {
        res.status(400).json({
          message: 'Error al crear el evento o convocatoria',
          error: 'No se proporcionaron archivos de plantilla de los requisitos'
        })
        return
      }

      // Make sure that we don't have less templates than requirements that require them
      if (requirementsWithTemplate.length !== templateFiles.length) {
        res.status(400).json({
          message: 'Error al crear el evento o convocatoria',
          error: 'El número de archivos de plantilla no coincide con el número de requisitos que las requieren'
        })
        return
      }

      let fileCursor = 0

      // Build the requirements
      newActivityDataRaw.requirements = newActivityDataRaw.requirements.map((req: ActivityRequirement) => {
        if (req.template !== undefined) {
          const file = templateFiles[fileCursor++]

          return {
            ...req,
            template: {
              name: file.originalname,
              file_content: file.buffer,
              mimetype: file.mimetype
            }
          }
        } else {
          return {
            ...req,
            template: null
          }
        }
      })

      // Build the new activity data
      const newActivityData = toNewActivity({
        ...newActivityDataRaw,
        admin_creator_id: req.user.user_id,
        category_id: 1,
        poster_image: posterFile.buffer,
        poster_mimetype: posterFile.mimetype
      })

      const createdActivity = await activityService.createActivity(newActivityData)

      res.status(201).json({ activity: createdActivity })
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

  async updateActivity (req: Request, res: Response): Promise<void> {
    try {
      const activityId = parseId(req.params.activityId, 'El id de la actividad no fue proporcionado o tiene un formato inválido')
      const updateActivityDataJSON = JSON.parse(req.body.activityData)
      let updateActivityData = toUpdateActivity(updateActivityDataJSON)

      if (req.file !== undefined) {
        const posterFile = req.file

        updateActivityData = { ...updateActivityData, poster_image: posterFile.buffer, poster_mimetype: posterFile.mimetype }
      }

      const updatedActivity = await activityService.updateActivity(activityId, updateActivityData)

      res.status(200).json({ activity: updatedActivity })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al actualizar el evento o convocatoria',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al actualizar el evento o convocatoria',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  async getUserUpcomingActivities (req: AuthRequest, res: Response): Promise<undefined> {
    try {
      if (req.user === undefined) {
        res.status(403).json({
          message: 'Error al obtener los eventos o convocatorias futuras',
          error: 'Usuario no autenticado'
        })
        return
      }

      const upcomingUserActivities = await activityService.getUserUpcomingActivities(req.user.user_id)

      res.status(200).json({ activities: upcomingUserActivities })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al obtener los eventos o convocatorias futuras',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al obtener los eventos o convocatorias futuras',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  async getUserPastActivities (req: AuthRequest, res: Response): Promise<undefined> {
    try {
      if (req.user === undefined) {
        res.status(403).json({
          message: 'Error al obtener los eventos o convocatorias pasadas',
          error: 'Usuario no autenticado'
        })
        return
      }

      const userId = req.user.user_id

      if (!isNumber(userId)) {
        res.status(400).json({
          message: 'Error al obtener los eventos o convocatorias pasadas',
          error: 'El id proporcionado es inválido'
        })
        return
      }

      const pastUserActivities = await activityService.getUserPastActivities(+userId)

      res.status(200).json({ activities: pastUserActivities })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al obtener los eventos o convocatorias pasadas',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al obtener los eventos o convocatorias pasadas',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  async getUpcomingActivities (req: AuthRequest, res: Response): Promise<undefined> {
    try {
      if (req.user === undefined) {
        res.status(403).json({
          message: 'Error al obtener los eventos o convocatorias futuras',
          error: 'Usuario no autenticado'
        })
        return
      }

      // Si el usuario está autenticado y tiene un rol asignado
      let upcomingActivities

      if (req.user.role_id === ADMIN_ROLE_ID) {
        upcomingActivities = await activityService.getUpcomingActivities()
      } else {
        upcomingActivities = await activityService.getUpcomingActivitiesByRole(req.user.role_id)
      }

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
      const { activityId } = req.params

      if (!isNumber(activityId)) {
        res.status(400).json({
          message: 'Error al obtener el poster del evento o convocatoria',
          error: 'El id proporcionado es inválido'
        })
        return
      }

      const posterInfo = await activityService.getActivityPoster(+activityId)

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
