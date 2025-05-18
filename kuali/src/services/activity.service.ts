import axios, { AxiosInstance } from 'axios'
import authService from './auth.service'
import { ArrayResponse, ResponseError } from '../types/Request'
import { Activity, NewActivityData } from '../types/Activity'
import { template } from '@babel/core'
import { getFileInfo } from '../utils/parsing'

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

  async createActivity(newActivityData: NewActivityData) {
    try {
      const formData = new FormData()

      // Manejo de imagen local
      const localUri = newActivityData.poster_image_uri
      console.log(localUri)
      const posterFileInfo = getFileInfo(localUri)

      formData.append('poster_image', {
        uri: localUri,
        name: posterFileInfo.fileName,
        type: posterFileInfo.mimeType,
      } as any)

      const activityData = {
        ...newActivityData,
        requirements: newActivityData.requirements.map((req) => {
          return {
            name: req.name,
            description: req.description,
            template: req.template_uri
              ? {
                  name: `${req.name}_plantilla`,
                }
              : undefined,
          }
        }),
      }

      const requirementsWithTemplate = newActivityData.requirements.filter(
        (req) => req.template_uri !== null,
      )

      requirementsWithTemplate.forEach((req) => {
        const templateInfo = getFileInfo(req.template_uri!)

        formData.append('template_files', {
          uri: req.template_uri,
          name: templateInfo.fileName,
          type: templateInfo.mimeType,
        } as any)
      })

      formData.append(
        'activityData',
        JSON.stringify({
          ...activityData,
          poster_image_uri: undefined,
        }),
      )

      console.log(formData)

      const response = await this.api.post('/activities', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      console.log(response.data)
    } catch (error) {
      console.error('Error completo:', error)
      console.log(error.response.data)
    }
  }
}

export default new ActivityService()
