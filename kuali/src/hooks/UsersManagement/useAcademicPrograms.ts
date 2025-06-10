import { useState } from 'react'
import Toast from 'react-native-toast-message'
import { AcademicProgram } from '../../types/AcademicProgram'
import { Option } from '../../components/shared/SelectInput/interfaces'
import academicProgramService from '../../services/academicProgram.service'
import authService from '../../services/auth.service'
import { mapToOption } from '../../utils/mappers'

export const useAcademicPrograms = () => {
  const [academicPrograms, setAcademicPrograms] = useState<
    AcademicProgram[] | null
  >(null)
  const [academicProgram, setAcademicProgram] = useState<Option | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingAction, setLoadingAction] = useState(false)

  const getAcademicPrograms = async (available) => {
    setLoading(true)
    try {
      const result = await academicProgramService.getAcademicPrograms(available)

      if (!result.success && 'error' in result) {
        Toast.show({
          type: 'error',
          text1: result.message,
          text2: result.error,
        })
      } else {
        setAcademicPrograms(result.activities)
      }
    } catch (error) {
      console.error('Error al obtener actividades', error)
      Toast.show({
        type: 'error',
        text1: 'Error al cargar los programas académicos',
        text2: 'Por favor, intenta de nuevo más tarde',
      })
      setAcademicPrograms([])
    } finally {
      setLoading(false)
    }
  }

  const updateAcademicProgram = async (
    academicProgramId: number,
    newName: string,
  ) => {
    setLoadingAction(true)
    const token = await authService.getToken()
    if (!token) {
      console.log('Token expirado o sin acceso')
      return
    }
    try {
      const result = await academicProgramService.updateAcademicProgram(
        academicProgramId,
        newName,
      )

      if (!result.success && 'error' in result) {
        Toast.show({
          type: 'error',
          text1: result.message,
          text2: result.error,
        })
      } else {
        setAcademicPrograms(
          (prevOptions) =>
            prevOptions?.map((option) =>
              option.program_id === academicProgramId
                ? { ...option, name: newName }
                : option,
            ) ?? null,
        )
        Toast.show({
          type: 'success',
          text1: 'Programa académico actualizado',
          text2: 'El nombre del programa académico se actualizó correctamente',
        })
      }
    } catch (error) {
      console.error('Error al actualizar al programa académico', error)
      Toast.show({
        type: 'error',
        text1: 'Error al actualizar el programa académico',
        text2: 'Por favor, intenta de nuevo más tarde',
      })
    } finally {
      setLoadingAction(false)
    }
  }

  const deleteAcademicProgram = async (academicProgramId: number) => {
    setLoadingAction(true)
    const token = await authService.getToken()
    if (!token) {
      console.log('Token expirado o sin acceso')
      return
    }
    try {
      const result =
        await academicProgramService.deleteAcademicProgram(academicProgramId)

      if (!result.success && 'error' in result) {
        Toast.show({
          type: 'error',
          text1: result.message,
          text2: result.error,
        })
      } else {
        setAcademicPrograms(
          (prevOptions) =>
            prevOptions?.filter(
              (option) => option.program_id !== academicProgramId,
            ) ?? null,
        )
        Toast.show({
          type: 'success',
          text1: 'Programa académico eliminado',
          text2: 'El programa académico se eliminó correctamente',
        })
      }
    } catch (error) {
      console.error('Error al eliminar el programa académico:', error)
      Toast.show({
        type: 'error',
        text1: 'Error al eliminar el programa académico',
        text2: 'Por favor, intenta de nuevo más tarde',
      })
    } finally {
      setLoadingAction(false)
    }
  }

  const createAcademicProgram = async (
    name: string,
  ): Promise<Option | void> => {
    setLoadingAction(true)
    const token = await authService.getToken()
    if (!token) {
      console.log('Token expirado o sin acceso')
      return
    }
    try {
      const result = await academicProgramService.createAcademicProgram(name)

      if (!result.success) {
        Toast.show({
          type: 'error',
          text1: 'Error al crear el programa académico',
        })
        return
      }

      Toast.show({
        type: 'success',
        text1: 'Programa académico creado',
        text2: 'El programa académico fue creado correctamente',
      })

      const newProgram = result.data.academic_program
      setAcademicPrograms((prev) => [...(prev || []), newProgram])

      return mapToOption(newProgram, 'program_id', 'name')
    } catch (error) {
      console.error('Error al crear el programa académico', error)
      Toast.show({
        type: 'error',
        text1: 'Error al crear el programa académico',
        text2: 'Por favor intenta de nuevo más tarde',
      })
    } finally {
      setLoadingAction(false)
    }
  }

  return {
    academicPrograms,
    getAcademicPrograms,
    updateAcademicProgram,
    deleteAcademicProgram,
    createAcademicProgram,
    loading,
  }
}
