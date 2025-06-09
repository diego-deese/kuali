import { AxiosInstance } from 'axios'
import { ResponseError, Message, ApiResponse, Response } from '../types/Request'
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

  async createAcademicProgram(
    name: string,
  ): Promise<
    ApiResponse<{ academic_program: AcademicProgram }> | ResponseError
  > {
    try {
      const body = {
        name: name,
      }
      const response = await this.api.post(`/academic-programs`, body)

      if (response.status === 201) {
        return {
          success: true,
          data: response.data as { academic_program: AcademicProgram },
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
          message:
            errorResponse?.message ||
            'Error al crear el nuevo programa académico',
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

  async updateAcademicProgram(
    academicProgramId,
    renamedProgram: string,
  ): Promise<
    ApiResponse<{ academic_program: AcademicProgram }> | ResponseError
  > {
    try {
      const body = {
        name: renamedProgram,
      }
      const response = await this.api.patch(
        `academic-programs/${academicProgramId}`,
        body,
      )

      if (response.status === 200) {
        return {
          success: true,
          data: response.data as { academic_program: AcademicProgram },
        }
      }

      return {
        success: false,
        message: 'Error al renombrar el programa académico',
        error: 'Respuesta inesperada del servidor',
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response.data as ResponseError
        return {
          success: false,
          message:
            errorResponse?.message ||
            'Error al actualizar al programa académico',
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

  async deleteAcademicProgram(
    academicProgramId: number,
  ): Promise<Response<Message> | ResponseError> {
    try {
      const response = await this.api.delete(
        `/academic-programs/${academicProgramId}`,
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
          response.data.message || 'Error al eliminar el programa académico',
        error:
          response.data.error || 'No se pudo eliminar el programa académico',
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response)
        const errorResponse = error.response.data as ResponseError
        return {
          success: false,
          message:
            errorResponse?.message || 'Error al eliminar el programa académico',
          error:
            errorResponse?.error || 'Por favor, intenta de nuevo más tarde',
        }
      }

      return {
        success: false,
        message: 'Error al conectar con el servidor',
        error: 'Por favor, verifica tu conexión e intenta de nuevo más tarde',
      }
    }
  }
}

export default new academicProgramService()
