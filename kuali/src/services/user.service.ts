import { AxiosInstance } from 'axios'
import authService from './auth.service'
import { ResponseError, Message, ApiResponse } from '../types/Request'
import axios from 'axios'
import { NewUser } from '../types/User'

interface UserProfile {
  user_id?: number
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

  async deactiveProfile(userId: number): Promise<Message | ResponseError> {
    try {
      const response = await this.api.put(`/users/students/${userId}`)

      if (response.status === 200) {
        return response.data as Message
      }

      return {
        success: false,
        message: 'Error al desactivar la cuenta del usuario',
        error: 'Respuesta inesperada del servidor',
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseError
        return {
          success: false,
          message: errorResponse?.message || 'Error al desactivar la cuenta',
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

  async createProfile(
    newUser: NewUser,
  ): Promise<ApiResponse<{ user: UserProfile }> | ResponseError> {
    try {
      const response = await this.api.post(`/users`, newUser)

      if (response.status === 200) {
        return {
          success: true,
          data: response.data as { user: UserProfile },
        }
      }

      return {
        success: false,
        message: 'Error al crear al nuevo usuario',
        error: 'Respuesta inesperada del servidor',
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseError
        return {
          success: false,
          message: errorResponse?.message || 'Error al crear la nueva cuenta',
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

  async updateProfile(
    userId: number,
    updatedUser: NewUser,
  ): Promise<ApiResponse<{ user: UserProfile }> | ResponseError> {
    try {
      const response = await this.api.put(`/users/${userId}`, updatedUser)

      if (response.status === 200) {
        return {
          success: true,
          data: response.data as { user: UserProfile },
        }
      }

      return {
        success: false,
        message: 'Error al actualizar al usuario',
        error: 'Respuesta inesperada del servidor',
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseError
        return {
          success: false,
          message: errorResponse?.message || 'Error al actualizar al usuario',
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
  async getResearcherStudents(): Promise<
    { name: string; students: any[] }[] | ResponseError
  > {
    try {
      const response = await this.api.get('/users/researcher/students')
      if (response.status === 200 && response.data?.studentsByAcademicProgram) {
        return response.data.studentsByAcademicProgram
      }
      return {
        success: false,
        message: 'Error al obtener los estudiantes asignados',
        error: 'Respuesta inesperada del servidor',
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseError
        return {
          success: false,
          message: errorResponse?.message || 'Error al obtener estudiantes',
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
}

export default new UserService()
