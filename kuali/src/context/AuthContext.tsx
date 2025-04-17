// context/auth.js
import { createContext, useContext } from 'react'
import { useAuth as useAuthHook } from '../hooks/useAuth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const auth = useAuthHook()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}
