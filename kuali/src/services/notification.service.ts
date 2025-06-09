import axios, { AxiosInstance } from 'axios'
import authService from './auth.service'
import { ArrayResponse, ResponseError } from '../types/Request'
import { Notification } from '../types/Notification'

class NotificationService {
  private api: AxiosInstance

  constructor() {
    this.api = authService.getApiClient()
  }

  async getUserNotifications(): Promise<
    ArrayResponse<Notification> | ResponseError
  > {
    try {
      const response = await this.api.get('/notifications')

      if (response.status === 200) {
        return {
          success: true,
          data: response.data.notifications as Notification[],
        }
      }

      return {
        success: false,
        message:
          response.data.message ||
          'Error al obtener las notificaciones del usuario',
        error:
          response.data.error ||
          'No se pudieron obtener las notificaciones del usuario',
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseError
        console.log(errorResponse)
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

export default new NotificationService()
