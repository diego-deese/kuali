import axios, { AxiosInstance } from 'axios'
import authService from './auth.service'
import { ArrayResponse, Response, ResponseError } from '../types/Request'
import { Location } from '../types/Location'

class LocationService {
  private api: AxiosInstance

  constructor() {
    this.api = authService.getApiClient()
  }

  async getLocations(): Promise<ArrayResponse<Location> | ResponseError> {
    try {
      const response = await this.api.get('/locations')

      if (response.status === 200) {
        return { success: true, data: response.data.locations as Location[] }
      }

      return {
        success: false,
        message:
          response.data.message || 'Error al obtener los lugares almacenados',
        error:
          response.data.error ||
          'No se pudieron obtener los lugares almacenados',
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

  async renameLocation(
    locationId: number,
    name: string,
  ): Promise<Response<Location> | ResponseError> {
    try {
      const response = await this.api.put(`/locations/${locationId}`, { name })

      if (response.status === 200) {
        return { success: true, data: response.data.locations as Location }
      }

      return {
        success: false,
        message: response.data.message || 'Error al renombrar el lugar',
        error: response.data.error || 'No se pudo renombrar el lugar',
      } as ResponseError
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseError
        return {
          success: false,
          message:
            errorResponse?.message || 'Error al conectar con el servidor',
          error:
            errorResponse?.error ||
            'Verifica tu conexión o intenta de nuevo más tarde',
        } as ResponseError
      }
      return {
        success: false,
        message: 'Error desconocido',
        error: error.message,
      } as ResponseError
    }
  }
}

export default new LocationService()
