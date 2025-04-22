import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Toast from 'react-native-toast-message'
import { router } from 'expo-router'

export function useLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { onLogin, loading } = useAuth()

  async function handleLogin() {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error al iniciar sesión',
        text2: 'Por favor ingresa tu email y contraseña',
      })
      return
    }

    const result = await onLogin!(email, password)
    if (!result.success) {
      Toast.show({
        type: 'error',
        text1: result.message,
        text2: result.error,
      })
    } else {
      router.replace('/myactivities')
    }
  }

  return {
    email: { email, setEmail },
    password: { password, setPassword },
    loading,
    handleLogin,
  }
}
