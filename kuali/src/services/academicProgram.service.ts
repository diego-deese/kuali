import { AxiosInstance } from 'axios'
import { ResponseError, Message, ApiResponse } from '../types/Request'
import axios from 'axios'
import { AcademicProgram } from '../types/AcademicProgram'
import authService from './auth.service'

class academicProgramService {
  private api: AxiosInstance

  constructor() {
    this.api = authService.getApiClient()
  }

  async getAcademicPrograms() {
    try {
      const response = await this.api.get(
        `academic-programs?hasResearcher=true`,
      )

      if (response.status === 200) {
        return {
          success: true,
          activities: response.data.academic_programs as AcademicProgram[],
        }
      }

      return {
        success: false,
        message:
          response.data.message ||
          'Error al obtener los programas académicos disponibles',
        error:
          response.data.error ||
          'No se pudieron obtener los porgramas académicos disponibles',
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
}

export default new academicProgramService()
