import { AxiosInstance, AxiosError } from 'axios'
import authService from './auth.service'
import { ResponseError } from '../types/Request'
import axios from 'axios'

interface UserProfile {
  user_id: number
  name: string
  second_name: string
  paternal_lastname: string
  maternal_lastname: string
  curp?: string
  identifier: string
  role: {
    role_id: number
    name: string
  }
  institutional_email: string
  personal_email?: string
  program?: string
}

class UserService {
  private api: AxiosInstance

  constructor() {
    this.api = authService.getApiClient()
  }

  async getUserProfile(userId: number): Promise<UserProfile | ResponseError> {
    try {
      const response = await this.api.get(`/users/${userId}`)

      if (response.status === 200) {
        // Extraer el objeto user de la respuesta
        if (response.data && response.data.user) {
          return response.data.user
        }

        return {
          success: false,
          message: 'Estructura de datos inesperada',
          error:
            'El servidor no devolvió datos del usuario en el formato esperado',
        }
      }

      return {
        success: false,
        message: 'Error al obtener el perfil de usuario',
        error: 'Los datos del usuario no están disponibles',
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseError
        return {
          success: false,
          message: errorResponse?.message || 'Error al obtener el perfil',
          error:
            errorResponse?.error || 'Por favor, intenta de nuevo más tarde',
        }
      }
      return {
        success: false,
        message: 'Error al conectar con el servidor',
        error: 'Por favor, verifica tu conexión o intenta más tarde',
      }
    }
  }

  getProfilePhotoUrl(userId: number): string {
    return `${process.env.EXPO_PUBLIC_API_URL}/users/${userId}/profilePhoto`
  }
}

export default new UserService()
