// hooks/useUsers.ts
import { useEffect, useState, useCallback } from 'react'
import { User } from '../../types/User'
import multipleUsersService from '../../services/multipleUsers.service'
import authService from '../../services/auth.service'

export function useGetUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    const token = await authService.getToken()
    if (!token) {
      setError('Token expirado o sin acceso')
      setLoading(false)
      return
    }

    const response = await multipleUsersService.getUsers()
    if (response.success && Array.isArray(response.users)) {
      setUsers(response.users)
      setError(null)
    } else {
      setError(response.error || 'No se pudieron obtener los usuarios')
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return { users, loading, error, refetch: fetchUsers }
}
