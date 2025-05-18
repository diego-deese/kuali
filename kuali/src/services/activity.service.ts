import axios, { AxiosInstance } from 'axios'
import authService from './auth.service'
import { ArrayResponse, ResponseError, Response } from '../types/Request'
import { Activity } from '../types/Activity'

class ActivityService {
  private api: AxiosInstance

  constructor() {
    this.api = authService.getApiClient()
  }

  getActivityPosterUrl(activityId: number): string {
    return `${process.env.EXPO_PUBLIC_API_URL}/activities/${activityId}/poster`
  }

  async getUpcomingActivities(): Promise<
    ArrayResponse<Activity> | ResponseError
  > {
    try {
      const response = await this.api.get(`/activities/upcoming/user`)

      if (response.status === 200) {
        return { success: true, data: response.data.activities as Activity[] }
      }

      return {
        success: false,
        message:
          response.data.message ||
          'Error al obtener las actividades próximas del usuario',
        error:
          response.data.error ||
          'No se pudieron obtener las actividades próximas del usuario',
      } as ResponseError
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseError
        return {
          success: false,
          message:
            errorResponse?.message || 'Error al conectar con el servidor',
          error:
            errorResponse?.error || 'Verifica tu conexión e intenta de nuevo',
        } as ResponseError
      }
      return {
        success: false,
        message: 'Error desconocido',
        error: error.message,
      } as ResponseError
    }
  }

  async getPastActivities(): Promise<ArrayResponse<Activity> | ResponseError> {
    try {
      const response = await this.api.get(`/activities/past/user`)

      if (response.status === 200) {
        return { success: true, data: response.data.activities as Activity[] }
      }

      return {
        success: false,
        message:
          response.data.message ||
          'Error al obtener las actividades próximas del usuario',
        error:
          response.data.error ||
          'No se pudieron obtener las actividades próximas del usuario',
      } as ResponseError
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseError
        return {
          success: false,
          message:
            errorResponse?.message || 'Error al conectar con el servidor',
          error:
            errorResponse?.error || 'Verifica tu conexión e intenta de nuevo',
        } as ResponseError
      }
      return {
        success: false,
        message: 'Error desconocido',
        error: error.message,
      } as ResponseError
    }
  }

  async getAllActivities() {
    try {
      const response = await this.api.get(`activities`)

      if (response.status === 200) {
        return { success: true, users: response.data.activities as Activity[] }
      }

      return {
        success: false,
        message:
          response.data.message ||
          'Error al obtener las actividades calendarizadas',
        error:
          response.data.error ||
          'No se pudieron obtener las actividades calendarizadas',
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseError
        return {
          success: false,
          message:
            errorResponse?.message ||
            'Ocurrió un problema conectando con el servidor',
          error: errorResponse?.error || 'Error al conectar con el servidor',
        }
      }

      return {
        success: false,
        message: 'Error desconocido',
        error: error.message,
      } as ResponseError
    }
  }

  // Método para obtener actividad por ID
  async getActivityById(
    activityId: number,
  ): Promise<Response<Activity> | ResponseError> {
    try {
      const response = await this.api.get(`/activities/${activityId}`)

      if (response.status === 200) {
        return {
          success: true,
          data: response.data.activity as Activity,
        }
      }

      return {
        success: false,
        message:
          response.data.message || 'Error al obtener los detalles del evento',
        error:
          response.data.error || 'No se pudo obtener la información del evento',
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
