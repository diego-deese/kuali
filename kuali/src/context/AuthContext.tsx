import { useState, useEffect, createContext, useContext } from 'react'
import authService from '../services/auth.service'

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
  onLogin?: (email: string, password: string) => Promise<any>
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
    const loadToken = async () => {
      const access_token = await authService.getToken()

      if (access_token) {
        setAuthenticated(true)
      } else {
        setAuthenticated(false)
      }

      setLoading(false)
    }
    loadToken()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const result = await authService.login(email, password, false)

      if (result !== null) {
        setAuthenticated(true)
        setUser(result.user)
      }
    } catch (error) {
      return { error: true, msg: (error as any).response.data.msg }
    } finally {
      setLoading(false)
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
