import { useState, useEffect, useCallback } from 'react'
import authService from '../services/auth.service'
import { router } from 'expo-router'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)

  // Comprobar el estado de autenticación al cargar
  useEffect(() => {
    checkAuthStatus()
  }, [])

  // Verificar si el usuario está autenticado
  const checkAuthStatus = async () => {
    try {
      console.log('Revisando estatus de autenticacion')
      setIsLoading(true)
      const authenticated = await authService.isAuthenticated()
      setIsAuthenticated(authenticated)

      if (authenticated) {
        const savedUser = await authService.getCurrentUser()
        if (savedUser) setUser(savedUser)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = useCallback(
    async (email, password, rememberMe): Promise<boolean> => {
      setIsLoading(true)
      try {
        const result = await authService.login(email, password, rememberMe)

        if (result.success) {
          setIsAuthenticated(true)

          if (result.data) {
            console.log('Agregando usuario')
            setUser(result.data)
          }

          // Me aseguro de que el cambio de estado se complete
          setTimeout(() => {
            router.replace('/(tabs)')
          }, 0)

          return true
        } else {
          await authService.removeToken()
          setIsAuthenticated(false)
          return false
        }
      } catch (error) {
        console.error('Error al tratar de loggear al usuario: ', error.message)
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  const logout = useCallback(async () => {
    setIsLoading(true)
    try {
      await authService.logout()
      setIsAuthenticated(false)
      setUser(null)
      router.replace('/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    user,
  }
}
