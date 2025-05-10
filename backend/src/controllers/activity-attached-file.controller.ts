import { Request, Response } from 'express'
import activityAttachedFileService from '../services/activity-attached-file.service'
import { AppError } from '../types/Error'
import { isNumber } from '../utils/validations'

class ActivityAttachedFileController {
  uploadFile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.body
      const { activityId } = req.params
      const file = req.file

      if (file === undefined) {
        res.status(400).json({
          message: 'Error al subir el archivo a la Base de Datos',
          error: 'No se proporcionó el archivo'
        })
        return
      }

      if (name === undefined) {
        res.status(400).json({
          message: 'Error al subir el archivo a la Base de Datos',
          error: 'No se proporcionó el nombre del archivo'
        })
        return
      }

      const activityAttachedFile = await activityAttachedFileService.uploadFile(+activityId, name, file)

      res.status(201).json({ activityAttachedFile })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al subir el archivo a la Base de Datos',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al subir el archivo a la Base de Datos',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  downloadFile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { fileId } = req.params

      if (!isNumber(fileId)) {
        res.status(400).json({
          message: 'Error al descargar el archivo',
          error: 'El id proporcionado es inválido'
        })
        return
      }

      const file = await activityAttachedFileService.getFile(+fileId)

      res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(file.name)}"`)
      res.setHeader('Content-Type', file.mimetype)
      res.setHeader('Content-Length', file.file_content.length)
      res.send(Buffer.from(file.file_content))
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al descargar el archivo',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al descargar el archivo',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }
}

export default new ActivityAttachedFileController()
