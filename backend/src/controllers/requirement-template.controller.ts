import { Request, Response } from 'express'
import activityAttachedFileService from '../services/requirement-template.service'
import { AppError } from '../types/Error'
import { isNumber } from '../utils/validations'
import { toNewRequirementTemplate } from '../utils/parsing/RequirementTemplate'

class RequirementTemplateController {
  uploadFile = async (req: Request, res: Response): Promise<void> => {
    try {
      const file = req.file

      if (file === undefined) {
        res.status(400).json({
          message: 'Error al subir la plantilla del requisito',
          error: 'No se proporcionó el archivo de la platilla'
        })
        return
      }

      const newRequirementTemplateData = toNewRequirementTemplate({
        name: file.filename,
        file_content: file.buffer,
        mimetype: file.mimetype,
        requirement_id: req.params.requirementId
      })

      await activityAttachedFileService.uploadFile(newRequirementTemplateData)

      res.status(201).json({ message: 'La plantilla del requisito se subió con éxito' })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al subir la plantilla del requisito',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al subir la plantilla del requisito',
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

export default new RequirementTemplateController()
