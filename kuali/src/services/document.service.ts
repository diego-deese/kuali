import axios, { AxiosInstance } from 'axios'
import authService from './auth.service'
import { ResponseError, Response } from '../types/Request'
import { getFileInfo } from '../utils/parsing'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'

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
   * Descarga una plantilla y la guarda localmente
   * @param templateId ID de la plantilla a descargar
   * @param templateName Nombre de la plantilla para el archivo
   * @returns Promise con el resultado de la descarga
   */
  async downloadTemplate(
    templateId: number,
    templateName: string,
  ): Promise<{
    success: boolean
    localUri?: string
    error?: string
  }> {
    try {
      // Obtener el token de autenticación
      const token = await authService.getToken()
      if (!token) {
        throw new Error('No se encontró token de autenticación')
      }

      // URL de descarga con token
      const downloadUrl = `${process.env.EXPO_PUBLIC_API_URL}/requirement-templates/download/${templateId}`

      // Determinar la extensión del archivo
      const extension = this.getFileExtension(templateName)

      // Crear nombre de archivo único
      const timestamp = new Date().getTime()
      const fileName = `${templateName.replace(/[^a-zA-Z0-9]/g, '_')}_${timestamp}.${extension}`

      // Ruta donde se guardará el archivo
      const fileUri = `${FileSystem.documentDirectory}${fileName}`

      // Descargar el archivo
      const downloadResult = await FileSystem.downloadAsync(
        downloadUrl,
        fileUri,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (downloadResult.status === 200) {
        return {
          success: true,
          localUri: downloadResult.uri,
        }
      } else {
        throw new Error(`Error de descarga: ${downloadResult.status}`)
      }
    } catch (error) {
      console.error('Error al descargar plantilla:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      }
    }
  }

  /**
   * Comparte un archivo descargado
   * @param fileUri URI local del archivo
   * @returns Promise indicando si se pudo compartir
   */
  async shareFile(fileUri: string): Promise<boolean> {
    try {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri)
        return true
      } else {
        console.log('Sharing no está disponible en este dispositivo')
        return false
      }
    } catch (error) {
      console.error('Error al compartir archivo:', error)
      return false
    }
  }

  /**
   * Determina la extensión del archivo basado en el nombre
   * @param templateName Nombre de la plantilla
   * @returns Extensión del archivo
   */
  private getFileExtension(templateName: string): string {
    const nameLower = templateName.toLowerCase()

    if (nameLower.includes('pdf')) return 'pdf'
    if (nameLower.includes('word') || nameLower.includes('doc')) return 'docx'

    // Valor por defecto
    return 'pdf'
  }

  /**
   * @param templateId ID de la plantilla a descargar
   * @returns URL para descargar la plantilla
   */
  async getTemplateDownloadUrl(templateId: number): Promise<string> {
    const token = await authService.getToken()
    return `${process.env.EXPO_PUBLIC_API_URL}/requirement-templates/download/${templateId}?token=${token}`
  }
}

export default new DocumentService()
