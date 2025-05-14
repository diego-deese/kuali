import { ActivityAttachedFiles } from '../generated/client'
import prisma from '../lib/prisma'
import { CreatedAttachedFile } from '../types/ActivityAttachedFile'
import { NotFoundError } from '../types/Error'

class ActivityAttachedFileService {
  async uploadFile (activityId: number, file: Express.Multer.File): Promise<CreatedAttachedFile> {
    try {
      // Preparar datos para guardar en la base de datos
      const documentData = {
        name: file.originalname,
        file_content: file.buffer, // Contenido binario del archivo
        mimetype: file.mimetype,
        activity_id: activityId
      }

      // Guardar el archivo en la base de datos como datos binarios
      const activityAttachedFile = await prisma.activityAttachedFiles.create({
        data: documentData,
        omit: {
          file_content: true,
          mimetype: true
        }
      })

      return activityAttachedFile
    } catch (error) {
      console.error('Error al guardar el documento en la base de datos:', error)
      throw new Error('No se pudo guardar el documento en la base de datos')
    }
  }

  async getFile (fileId: number): Promise<ActivityAttachedFiles> {
    try {
      const file = await prisma.activityAttachedFiles.findUnique({
        where: {
          activity_attached_file_id: fileId
        }
      })

      if (file === null) {
        throw new NotFoundError('No se econtró ningún archivo con ese id')
      }

      return file
    } catch (error) {
      console.error('Error al obtener el documento:', error)
      throw new Error('No se pudo obtener el archivo')
    }
  }
}

export default new ActivityAttachedFileService()
