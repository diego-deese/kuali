import { AxiosError, AxiosInstance } from 'axios'
import { ResponseError } from '../types/Request'
import axios from 'axios'
import { User } from '../types/User'
import authService from './auth.service'

class MultipleUsersService {
  private api: AxiosInstance

  constructor() {
    this.api = authService.getApiClient()
  }
  async getUsers() {
    try {
      const token = await authService.getToken()

      if (!token) {
        throw new Error('Token no disponible')
      }

      const response = await this.api.get(`users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        return { success: true, users: response.data.users as User[] }
      }

      return {
        success: false,
        message: response.data.message || 'Error al obtener los usuarios',
        error: response.data.error || 'Error al obtener los usuarios',
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseError
        return {
          success: false,
          message:
            errorResponse?.message || 'Error al conectar con el servidor',
          error: errorResponse?.error || 'Error al conectar con el servidor',
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

export default new MultipleUsersService()
