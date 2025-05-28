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
  async getDocumentsGroupedBy(
    activityId: number,
    groupBy: 'requirement' | 'user',
  ) {
    try {
      const response = await this.api.get(
        `/user-documents/activity/${activityId}?groupBy=${groupBy}`,
      )

      if (response.status === 200) {
        return {
          success: true,
          data: response.data.groupedUserDocuments,
        }
      }

      return {
        success: false,
        message: response.data.message,
        error: response.data.error,
      }
    } catch (error: any) {
      return {
        success: false,
        message: 'Error al conectar con el servidor',
        error: error.message,
      }
    }
  }
  async approveUserDocument(userDocumentId: number) {
    return this.api.patch(`/user-documents/${userDocumentId}/approve`)
  }

  async rejectUserDocument(userDocumentId: number) {
    return this.api.patch(`/user-documents/${userDocumentId}/reject`)
  }
  async downloadUserDocument(userDocumentId: number): Promise<Blob | null> {
    try {
      const response = await this.api.get(
        `/user-documents/download/${userDocumentId}`,
        {
          responseType: 'blob',
        },
      )

      return response.data
    } catch (error) {
      console.error('Error al descargar el documento:', error)
      return null
    }
  }
}

export default new UserDocumentService()
