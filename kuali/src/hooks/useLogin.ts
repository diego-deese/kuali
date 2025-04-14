import { useState } from 'react'
import { Alert } from 'react-native'
import { useAuth } from './useAuth'

export function useLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const { login, isLoading } = useAuth()

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa tu email y contraseña')
      return
    }

    try {
      await login(email, password, rememberMe)
    } catch (error) {
      Alert.alert('Error al iniciar sesión', error)
    }
  }

  return {
    email: { email, setEmail },
    password: { password, setPassword },
    rememberMe: { rememberMe, setRememberMe },
    isLoading,
    handleLogin,
  }
}
