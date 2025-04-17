import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import { Alert } from 'react-native'

const TOKEN_KEY = 'userToken'

class AuthService {
  async login(email: string, password: string, rememberMe: boolean) {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            institutionalEmail: email,
            password: password,
          }),
        },
      )

      const data = await response.json()

      if (response.status === 200 && data.tokens?.access_token) {
        if (rememberMe) await AsyncStorage.setItem('rememberMe', 'true')
        await SecureStore.setItemAsync('userSession', JSON.stringify(data))
        await AsyncStorage.setItem(TOKEN_KEY, data.tokens.access_token)
        return { success: true, data: data }
      }

      Alert.alert(data.message, data.error)
      return { success: false }
    } catch (error) {
      console.error(error)
      Alert.alert(
        'Error de conexión',
        'No se pudo establecer conexión con el servidor. Por favor, verifica tu conexión o intenta de nuevo más tarde.',
      )
      return { success: false }
    }
  }

  async logout() {
    try {
      await AsyncStorage.removeItem('userToken')
      return { success: true }
    } catch (error) {
      console.error(error)
      return { success: false, error: error.message }
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY)
      return !!token
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY)
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async removeToken(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY)
      return true
    } catch (error) {
      Alert.alert('Ocurrio un error al remover el token: ', error)
    }
  }

  async getCurrentUser() {
    const userJson = await SecureStore.getItemAsync('userSession')
    return userJson ? JSON.parse(userJson) : null
  }
}

export default new AuthService()
