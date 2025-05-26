import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import userService from '../../services/user.service'
import { ResponseError } from '../../types/Request'

export const useAssignedStudents = () => {
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const result = await userService.getResearcherStudents()
      //console.log('Respuesta del backend:', result)

      if ((result as ResponseError).success === false) {
        const error = result as ResponseError
        Toast.show({
          type: 'error',
          text1: error.message,
          text2: error.error,
        })
        setStudents([])
      } else {
        const groups = result as { name: string; students: any[] }[]
        const flatStudents = groups.flatMap((group) => group.students)
        setStudents(flatStudents)
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error inesperado',
        text2: 'No se pudieron cargar los estudiantes',
      })
      setStudents([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  return {
    students,
    loading,
    refetch: fetchStudents,
  }
}
