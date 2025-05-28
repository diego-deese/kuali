import axios, { AxiosInstance } from 'axios'
import authService from './auth.service'
import { ResponseError, Response } from '../types/Request'
import { getFileInfo } from '../utils/parsing'

class DocumentService {
  private api: AxiosInstance

  constructor() {
    this.api = authService.getApiClient()
  }

  /**
   * Sube un documento asociado a un requisito de una actividad
   * @param activityId ID de la actividad
   * @param requirementId ID del requisito
   * @param fileUri URI del archivo local a subir
   * @returns Respuesta con información del resultado de la operación
   * @param templateId ID de la plantilla a descargar
   * @returns URL para descargar la plantilla
   */
  async uploadDocument(
    activityId: number,
    requirementId: number,
    fileUri: string,
  ): Promise<Response<any> | ResponseError> {
    try {
      // Crear FormData para enviar el archivo
      const formData = new FormData()

      // Obtener información del archivo
      const fileInfo = getFileInfo(fileUri)

      // Agregar el archivo al FormData
      formData.append('file', {
        uri: fileUri,
        name: fileInfo.fileName,
        type: fileInfo.mimeType,
      } as any)

      // Agregar datos adicionales
      formData.append('activity_id', activityId.toString())
      formData.append('requirement_id', requirementId.toString())
      //formData.append('originalFileName', fileInfo.fileName)

      // Realizar la petición POST
      const response = await this.api.post(`/user-documents/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (response.status === 201) {
        return {
          success: true,
          data: response.data,
        }
      }

      return {
        success: false,
        message: response.data.message || 'Error al subir documento',
        error: response.data.error || 'No se pudo subir el documento',
      }
    } catch (error) {
      console.error('Error al subir documento:', error)
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseError
        return {
          success: false,
          message:
            errorResponse?.message || 'Error al conectar con el servidor',
          error:
            errorResponse?.error || 'Verifica tu conexión e intenta de nuevo',
        }
      }

      return {
        success: false,
        message: 'Error desconocido',
        error: error instanceof Error ? error.message : 'Error desconocido',
      }
    }
  }

  /**
   * Elimina un documento asociado a un usuario
   * @param documentId ID del documento a eliminar
   * @returns Respuesta con información del resultado de la operación
   */
  async deleteDocument(
    documentId: number,
  ): Promise<Response<any> | ResponseError> {
    try {
      const response = await this.api.delete(`/user-documents/${documentId}`)

      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        }
      }

      return {
        success: false,
        message: response.data.message || 'Error al eliminar documento',
        error: response.data.error || 'No se pudo eliminar el documento',
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseError
        return {
          success: false,
          message:
            errorResponse?.message || 'Error al conectar con el servidor',
          error:
            errorResponse?.error || 'Verifica tu conexión e intenta de nuevo',
        }
      }

      return {
        success: false,
        message: 'Error desconocido',
        error: error instanceof Error ? error.message : 'Error desconocido',
      }
    }
  }

  /**
   * @param templateId ID de la plantilla a descargar
   * @returns URL para descargar la plantilla
   */
  async getTemplateDownloadUrl(templateId: number): Promise<string> {
    const token = await authService.getToken()
    if (!token) {
      throw new Error('No hay token de autenticación disponible')
    }
    return `${process.env.EXPO_PUBLIC_API_URL}/requirement-templates/download/${templateId}?token=${token}`
  }
}

export default new DocumentService()
