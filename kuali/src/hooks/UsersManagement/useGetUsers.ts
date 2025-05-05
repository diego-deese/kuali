// hooks/useUsers.ts
import { useEffect, useState } from 'react'
import { User } from '../../types/User'
import multipleUsersService from '../../services/multipleUsers.service'
import authService from '../../services/auth.service'

export function useGetUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initialize = async () => {
      const token = await authService.getToken()
      if (!token) {
        setError('Token expirado o sin acceso')
        setLoading(false)
        return
      }

      const response = await multipleUsersService.getUsers()
      if (response.success && Array.isArray(response.users)) {
        setUsers(response.users)
      } else {
        setError(response.error || 'No se pudieron obtener los usuarios')
      }

      setLoading(false)
    }

    initialize()
  }, [])

  return { users, loading, error }
}
