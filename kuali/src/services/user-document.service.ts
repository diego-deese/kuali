import { AxiosInstance } from 'axios'
import authService from './auth.service'
import { ResponseError } from '../types/Request'
import axios from 'axios'

class UserDocumentService {
  private api: AxiosInstance

  constructor() {
    this.api = authService.getApiClient()
  }

  async getDocumentsGroupedByRequirement(activityId: number) {
    try {
      const response = await this.api.get(
        `/user-documents/activity/${activityId}?groupBy=requirement`,
      )

      if (response.status === 200) {
        return {
          success: true,
          data: response.data.groupedUserDocuments,
        }
      }

      return {
        success: false,
        message:
          response.data.message || 'Error al obtener documentos agrupados',
        error: response.data.error || 'No se pudieron obtener los documentos',
      }
    } catch (error: any) {
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
        error: (error as Error).message,
      }
    }
  }
}

export default new UserDocumentService()
