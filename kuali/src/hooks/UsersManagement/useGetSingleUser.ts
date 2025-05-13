import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import authService from '../../services/auth.service'
import userService from '../../services/user.service'
import { User } from '../../types/User'
import Toast from 'react-native-toast-message'

export function useGetSingleUser(userId: string) {
  const [userInfo, setUserInfo] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getUser = async () => {
      setLoading(true)
      try {
        const token = await authService.getToken()
        if (!token) {
          throw new Error('Token expirado o sin acceso')
        }
        const response = await userService.getUserProfile(Number(userId))
        if ('success' in response && !response.success) {
          throw new Error(response.message)
        }

        const user = response as User
        setUserInfo(user)
        setError(null)
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Error desconocido al obtener la información del usuario'
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errorMessage,
        })
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      getUser()
    }
  }, [userId])

  return { userInfo, loading, error }
}
