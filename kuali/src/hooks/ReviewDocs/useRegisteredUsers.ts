import { useEffect, useState } from 'react'
import RegistrationService from '../../services/registration.service'
import Toast from 'react-native-toast-message'
import { User } from '../../types/User'

export function useRegisteredUsers(activityId: number) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const getUsersByActivity = async () => {
    setLoading(true)
    try {
      const result = await RegistrationService.getAllUsersByActivity(activityId)
      if (!Array.isArray(result)) {
        throw new Error('La respuesta no es una lista de usuarios')
      }

      setUsers(result)
    } catch (error: any) {
      setError(error)
      Toast.show({
        type: 'error',
        text1: 'Error al cargar usuarios',
        text2: error?.message ?? 'Error desconocido',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (activityId) {
      getUsersByActivity()
    }
  }, [activityId])

  return { users, loading, error }
}
