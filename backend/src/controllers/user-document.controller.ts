import { Request, Response } from 'express'
import { parseId } from '../utils/parsing/shared'
import userDocumentService from '../services/user-document.service'
import { AppError } from '../types/Error'
import { APPROVED_ID, REJECTED_ID } from '../constants/revision-status'
import { toNewUserDocument, toUpdateUserDocument } from '../utils/parsing/UserDocument'
import { NewUserDocument } from '../types/UserDocuments'
import { AuthRequest } from '../types/Request'

class UserDocumentController {
  getActivityUserDocuments = async (req: Request, res: Response): Promise<void> => {
    try {
      const groupBy = req.query.groupBy === undefined ? 'requirement' : (req.query.groupBy as string).toLowerCase()
      const activityId = parseId(req.params.activityId, 'El id proporcionado de la actividad es inválido')

      let activityUserDocuments

      if (groupBy === 'requirement') {
        activityUserDocuments = await userDocumentService.getUserDocumentsByRequirement(activityId)
      } else if (groupBy === 'user') {
        activityUserDocuments = await userDocumentService.getUserDocumentsByUser(activityId)
      } else {
        res.status(400).json({
          message: 'Error al obtener los documentos de la actividad',
          error: 'Operación de agrupación no permitida, los valores permitidos son "requirement" o "user"'
        })
        return
      }

      res.status(200).json({ groupedUserDocuments: activityUserDocuments })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al obtener los documentos de la actividad',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al obtener los documentos de la actividad',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  approveDocument = async (req: Request, res: Response): Promise<void> => {
    try {
      const userDocumentId = parseId(req.params.userDocumentId, 'El id proporcionado del documento es inválido')

      const wasApproved = await userDocumentService.updateUserDocumentStatus(userDocumentId, APPROVED_ID)

      if (wasApproved) {
        res.status(200).json({ message: 'El documento fue aprobado con éxito' })
      } else {
        res.status(400).json({
          message: 'Error al aprobar el documento',
          error: 'No se pudo aprobar el documento'
        })
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al aprobar el documento',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al aprobar el documento',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  rejectDocument = async (req: Request, res: Response): Promise<void> => {
    try {
      const userDocumentId = parseId(req.params.userDocumentId, 'El id proporcionado del documento es inválido')

      const wasRejected = await userDocumentService.updateUserDocumentStatus(userDocumentId, REJECTED_ID)

      if (wasRejected) {
        res.status(200).json({ message: 'El documento fue rechazado con éxito' })
      } else {
        res.status(400).json({
          message: 'Error al rechazar el documento',
          error: 'No se pudo rechazar el documento'
        })
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al aprobar el documento',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al aprobar el documento',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  uploadUserDocument = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const file = req.file
      const activityId = parseId(req.body.activity_id, 'El id proporcionado de la actividad es inválido')
      const userId = parseId(req.user?.user_id, 'El id del usuario es inválido o el usuario no está autenticado')

      if (file === undefined) {
        res.status(400).json({
          message: 'Error al subir el archivo a la Base de Datos',
          error: 'No se proporcionó el archivo'
        })
        return
      }

      const newUserDocumentData: NewUserDocument = toNewUserDocument({
        ...req.body,
        file_content: file.buffer,
        mimetype: file.mimetype,
        file_name: file.originalname
      })

      await userDocumentService.uploadUserDocument(activityId, userId, newUserDocumentData)

      res.status(201).json({ message: 'El documento se subió correctamente' })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al subir el documento',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al subir el documento',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  downloadUserDocument = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userDocumentId = parseId(req.params.userDocumentId, 'El id proporcionado del documento es inválido')

      const userDocument = await userDocumentService.getUserDocument(userDocumentId)

      res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(userDocument.file_name)}"`)
      res.setHeader('Content-Type', userDocument.mimetype)
      res.setHeader('Content-Length', userDocument.file_content.length)
      res.send(Buffer.from(userDocument.file_content))
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al descargar el documento',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al descargar el documento',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  updateUserDocument = async (req: Request, res: Response): Promise<void> => {
    try {
      const userDocumentId = parseId(req.params.userDocumentId, 'El id proporcionado del documento es inválido')
      const file = req.file

      if (file === undefined) {
        res.status(400).json({
          message: 'Error al actualizar el documento',
          error: 'No se proporcionó el archivo'
        })
        return
      }

      const updateUserDocumentData = toUpdateUserDocument({
        file_content: file.buffer,
        file_name: file.originalname,
        mimetype: file.mimetype
      })

      const userDocumentUpdated = await userDocumentService.updateUserDocument(userDocumentId, updateUserDocumentData)

      if (userDocumentUpdated) {
        res.status(200).json({ message: 'Documento actualizado exitosamente' })
      } else {
        res.status(400).json({
          message: 'Error al actualizar el documento',
          error: 'No se pudo actualizar el documento'
        })
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al actualizar el documento',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al actualizar el documento',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  deleteUserDocument = async (req: Request, res: Response): Promise<void> => {
    try {
      const userDocumentId = parseId(req.params.userDocumentId, 'El id proporcionado del documento es inválido')

      const userDocumentDeleted = await userDocumentService.deleteUserDocument(userDocumentId)

      if (userDocumentDeleted) {
        res.status(200).json({ message: 'Documento eliminado exitosamente' })
      } else {
        res.status(400).json({
          message: 'Error al eliminar el documento',
          error: 'No se pudo eliminar el documento'
        })
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al eliminar el documento',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al eliminar el documento',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }
}

export default new UserDocumentController()
