import axios, { AxiosInstance } from 'axios'
import authService from './auth.service'
import { ResponseError } from '../types/Request'
import { Activity } from '../types/Activity'

class ActivityService {
  private api: AxiosInstance

  constructor() {
    this.api = authService.getApiClient()
  }

  async getUpcomingActivities(userId: number) {
    try {
      const response = await this.api.get(`users/${userId}/activities/upcoming`)

      if (response.status === 200) {
        return { success: true, ...(response.data as Activity) }
      }

      return {
        success: false,
        message:
          response.data.message ||
          'Error al obtener las actividades próximas del usuario',
        error:
          response.data.error ||
          'No se pudieron obtener las actividades próximas del usuario',
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
        error: error.message,
      }
    }
  }
}

export default new ActivityService()
