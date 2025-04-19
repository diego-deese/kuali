import { useState, useEffect, createContext, useContext } from 'react'
import authService from '../services/auth.service'
import { ResponseError } from '../types/Request'

interface User {
  user_id: number
  role: {
    role_id: number
    name: string
  }
}
interface AuthProps {
  authenticated?: boolean | null
  user?: User
  loading?: boolean
  onLogin?: (
    email: string,
    password: string,
    rememberMe: boolean,
  ) => Promise<any>
  onLogout?: () => Promise<any>
}

const AuthContext = createContext<AuthProps>({})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: any) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadUserSession = async () => {
      try {
        const isAuth = await authService.isAuthenticated()

        if (isAuth) {
          const savedUser = await authService.getCurrentUser()
          setUser(savedUser)
          setAuthenticated(true)
        } else {
          setUser(null)
          setAuthenticated(false)
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error)
        setAuthenticated(false)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadUserSession()
  }, [])

  const login = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean } | ResponseError> => {
    setLoading(true)
    const result = await authService.login(email, password)

    if (result.success) {
      setAuthenticated(true)
      setUser(result.user)
      setLoading(false)
      return { success: true }
    } else {
      setLoading(false)
      return result
    }
  }

  const logout = async () => {
    setLoading(true)
    await authService.logout()

    setAuthenticated(false)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  const value = {
    onLogin: login,
    onLogout: logout,
    authenticated,
    user,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
