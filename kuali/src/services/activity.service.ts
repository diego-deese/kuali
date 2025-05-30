import axios, { AxiosInstance } from 'axios'
import authService from './auth.service'
import { ArrayResponse, ResponseError, Response } from '../types/Request'
import {
  Activity,
  NewActivityData,
  UpdateActivityData,
} from '../types/Activity'
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
        return {
          success: true,
          activities: response.data.activities as Activity[],
        }
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

  async createActivity(
    newActivityData: NewActivityData,
  ): Promise<Response<Activity> | ResponseError> {
    try {
      const formData = new FormData()

      const localUri = newActivityData.poster_image_uri
      const posterFileInfo = getFileInfo(localUri)

      formData.append('poster_image', {
        uri: localUri,
        name: posterFileInfo.fileName,
        type: posterFileInfo.mimeType,
      } as any)

      let activityData

      if (
        newActivityData.requirements &&
        newActivityData.requirements.length > 0
      ) {
        activityData = {
          ...newActivityData,
          requirements: newActivityData.requirements.map((req) => {
            return {
              name: req.name,
              description: req.description,
              template:
                req.template !== null
                  ? {
                      name: `${req.name}_plantilla`,
                    }
                  : undefined,
            }
          }),
        }
        const requirementsWithTemplate = newActivityData.requirements.filter(
          (req) => req.template !== null,
        )

        requirementsWithTemplate.forEach((req) => {
          const templateInfo = getFileInfo(req.template.template_uri!)

          formData.append('template_files', {
            uri: req.template.template_uri,
            name: templateInfo.fileName,
            type: templateInfo.mimeType,
          } as any)
        })
      } else {
        activityData = newActivityData
      }

      formData.append(
        'activityData',
        JSON.stringify({
          ...activityData,
          poster_image_uri: undefined,
        }),
      )

      const response = await this.api.post('/activities', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (response.status === 201) {
        return {
          success: true,
          data: response.data.activity,
        }
      }

      return {
        success: false,
        message: response.data.message || 'Error al crear la nueva actividad',
        error: response.data.error || 'No se pudo crear la nueva actividad',
      }
    } catch (error) {
      console.error(error)
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

  async updateActivity(
    activityData: UpdateActivityData,
  ): Promise<Response<Activity> | ResponseError> {
    try {
      const formData = new FormData()

      const { poster_image_uri, ...activityInfo } = activityData

      if (poster_image_uri !== undefined) {
        const posterFileInfo = getFileInfo(poster_image_uri)

        formData.append('poster_image', {
          uri: poster_image_uri,
          name: posterFileInfo.fileName,
          type: posterFileInfo.mimeType,
        } as any)
      }

      activityData.requirements_to_edit.forEach((req) => {
        if (req.template?.template_uri) {
          const templateFileInfo = getFileInfo(req.template.template_uri)

          formData.append('added_template_file', {
            uri: req.template.template_uri,
            name: templateFileInfo.fileName,
            type: templateFileInfo.mimeType,
          } as any)
        }
      })

      activityData.requirements_to_add.forEach((req) => {
        if (req.template?.template_uri) {
          const templateFileInfo = getFileInfo(req.template.template_uri)

          formData.append('created_template_file', {
            uri: req.template.template_uri,
            name: templateFileInfo.fileName,
            type: templateFileInfo.mimeType,
          } as any)
        }
      })

      formData.append(
        'activityData',
        JSON.stringify({
          ...activityInfo,
          poster_image_uri: undefined,
        }),
      )

      const response = await this.api.patch(
        `/activities/${activityInfo.activity_id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      )

      if (response.status === 200) {
        return {
          success: true,
          data: response.data.activity,
        }
      }

      return {
        success: false,
        message: response.data.message || 'Error al crear la nueva actividad',
        error: response.data.error || 'No se pudo crear la nueva actividad',
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data)
        const errorResponse = error.response?.data as ResponseError
        return {
          success: false,
          message:
            errorResponse?.message || 'Error al conectar con el servidor',
          error:
            errorResponse?.error || 'Verifica tu conexión e intenta de nuevo',
        }
      }
    }
  }

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

  async applyToActivity(
    activityId: number,
  ): Promise<Response<any> | ResponseError> {
    try {
      console.log('baseURL usada:', this.api.defaults.baseURL)
      console.log('Headers enviados:', this.api.defaults.headers)

      const response = await this.api.post(
        `/registrations/activity/${activityId}`,
      )

      if (response.status === 201 || response.status === 200) {
        return {
          success: true,
          data: response.data,
        }
      }

      return {
        success: false,
        message:
          response.data.message || 'Error al registrarse en la actividad',
        error: response.data.error || 'No se pudo completar el registro',
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

  async unregisterFromActivity(
    activityId: number,
  ): Promise<Response<any> | ResponseError> {
    try {
      const response = await this.api.delete(
        `/registrations/activity/${activityId}`,
      )

      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        }
      }

      return {
        success: false,
        message:
          response.data.message || 'Error al darse de baja de la actividad',
        error: response.data.error || 'No se pudo completar la baja',
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
