import { AxiosInstance } from 'axios'
import { ResponseError, Message, ApiResponse } from '../types/Request'
import axios from 'axios'
import { AcademicProgram } from '../types/AcademicProgram'
import authService from './auth.service'
import { InscriptionData } from '../types/AcademicProgram'

class academicProgramService {
  private api: AxiosInstance

  constructor() {
    this.api = authService.getApiClient()
  }

  async getAcademicPrograms(available: boolean) {
    try {
      const response = await this.api.get(
        `academic-programs?hasResearcher=${available}`,
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

  async assignResearcher(
    inscriptionData: InscriptionData,
  ): Promise<Message | ResponseError> {
    try {
      const response = await this.api.patch(
        `/academic-programs/${inscriptionData.program_id}/assign-researcher`,
        inscriptionData,
      )

      if (response.status === 200) {
        return response.data as Message
      }

      return {
        success: false,
        message: 'Error al reactivar la cuenta del usuario',
        error: 'Respuesta inesperada del servidor',
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseError
        return {
          success: false,
          message: errorResponse?.message || 'Error al reactivar la cuenta',
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

  async unassignResearcher(
    inscriptionData: InscriptionData,
  ): Promise<Message | ResponseError> {
    try {
      const response = await this.api.patch(
        `/academic-programs/${inscriptionData.program_id}/unassign-researcher`,
        inscriptionData,
      )

      if (response.status === 200) {
        return response.data as Message
      }

      return {
        success: false,
        message: 'Error al eliminar la inscripción al programa académico',
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
}

export default new academicProgramService()
