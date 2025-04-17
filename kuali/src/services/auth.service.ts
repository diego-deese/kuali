import * as SecureStore from 'expo-secure-store'
import { Alert } from 'react-native'
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  USER_SESSION_KEY,
} from '../constants/storage_keys'
import { AuthResponse } from '../types/Auth'

class AuthService {
  async login(
    email: string,
    password: string,
    rememberMe: boolean,
  ): Promise<AuthResponse | null> {
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

      if (response.status === 200) {
        if (rememberMe) {
          await SecureStore.setItemAsync(
            REFRESH_TOKEN_KEY,
            data.tokens.refresh_token,
          )
        }
        await SecureStore.setItemAsync(
          ACCESS_TOKEN_KEY,
          data.tokens.access_token,
        )
        await SecureStore.setItemAsync(
          USER_SESSION_KEY,
          JSON.stringify(data.user),
        )
        return data

      }

      Alert.alert(data.message, data.error)
      return null
    } catch (error) {
      console.error(error)
      Alert.alert(
        'Error de conexión',
        'No se pudo establecer conexión con el servidor. Por favor, verifica tu conexión o intenta de nuevo más tarde.',
      )
      return null
    }
  }

  async logout() {
    try {
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY)
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY)
      await SecureStore.deleteItemAsync(USER_SESSION_KEY)
      return { success: true }
    } catch (error) {
      console.error(error)
      return { success: false, error: error.message }
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await SecureStore.getItem(ACCESS_TOKEN_KEY)

      return !!token
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getToken(): Promise<string | null> {
    try {
      return await SecureStore.getItem(ACCESS_TOKEN_KEY)
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async removeToken(): Promise<boolean> {
    try {
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY)
      return true
    } catch (error) {
      Alert.alert('Ocurrio un error al remover el token: ', error)
    }
  }

  async getCurrentUser() {
    const userJson = await SecureStore.getItem(USER_SESSION_KEY)
    return userJson ? JSON.parse(userJson) : null
  }
}

export default new AuthService()
