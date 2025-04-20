import * as SecureStore from 'expo-secure-store'
import axios, { AxiosInstance, AxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode'
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  USER_SESSION_KEY,
} from '../constants/storage_keys'
import { AuthResponse, ResponseError } from '../types/Request'

class AuthService {
  private api: AxiosInstance
  private isRefreshing = false
  private refreshSubscribers: ((token: string) => void)[] = []

  constructor() {
    this.api = axios.create({
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Interceptor para todas las peticiones
    this.api.interceptors.request.use(async (config) => {
      // Obtener token actual
      const token = await this.getToken()

      if (token) {
        // Verificar si el token está por expirar
        const isTokenExpiring = this.isTokenExpiringSoon(token)

        if (isTokenExpiring) {
          // Obtener nuevo token si está por expirar
          const newToken = await this.refreshAccessToken()
          if (newToken) {
            config.headers.Authorization = `Bearer ${newToken}`
          }
        } else {
          config.headers.Authorization = `Bearer ${token}`
        }
      }

      return config
    })

    // Interceptor para respuestas
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest: any = error.config

        // Si es un error 401 (No autorizado) y no hemos intentado refrescar
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          // Intentar refrescar el token
          const newToken = await this.refreshAccessToken()

          if (newToken) {
            // Actualizar header y reintentar
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            return this.api(originalRequest)
          }
        }

        return Promise.reject(error)
      },
    )
  }

  // Verificar si el token expira pronto (menos de 30 segundos)
  private isTokenExpiringSoon(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token)
      const expirationTime = decodedToken.exp * 1000 // Convertir a milisegundos
      return Date.now() + 30000 > expirationTime
    } catch (error) {
      console.error('Error decodificando token:', error)
      return true
    }
  }

  // Refrescar el token de acceso utilizando el refresh token
  private async refreshAccessToken(): Promise<string | null> {
    try {
      // Evitar múltiples refrescos simultáneos
      if (this.isRefreshing) {
        return new Promise<string>((resolve) => {
          this.refreshSubscribers.push(resolve)
        })
      }

      this.isRefreshing = true

      const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY)

      if (!refreshToken) {
        await this.logout()
        return null
      }

      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`,
        { refreshToken: refreshToken },
      )

      if (response.status === 200) {
        const newAccessToken = response.data.access_token
        await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, newAccessToken)

        // Notificar a todos los suscriptores que tenemos un nuevo token
        this.refreshSubscribers.forEach((callback) => callback(newAccessToken))
        this.refreshSubscribers = []

        return newAccessToken
      } else {
        // Si falla el refresh, hacer logout
        await this.logout()
        return null
      }
    } catch (error) {
      console.error('Error refreshing token:', error)
      await this.logout()
      return null
    } finally {
      this.isRefreshing = false
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<AuthResponse | ResponseError> {
    try {
      const response = await this.api.post('/auth/login', {
        institutionalEmail: email,
        password: password,
      })

      const data = await response.data

      if (response.status === 200) {
        await SecureStore.setItemAsync(
          REFRESH_TOKEN_KEY,
          data.tokens.refresh_token,
        )
        await SecureStore.setItemAsync(
          ACCESS_TOKEN_KEY,
          data.tokens.access_token,
        )
        await SecureStore.setItemAsync(
          USER_SESSION_KEY,
          JSON.stringify(data.user),
        )
        return { success: true, ...(data as AuthResponse) }
      }

      return { success: false, ...(data as ResponseError) }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseError
        return {
          success: false,
          error: errorResponse?.error || 'Error al conectar con el servidor',
          message:
            errorResponse?.message ||
            'Por favor, verifica tu conexión o intentalo de nuevo más tarde.',
        }
      }
      return {
        success: false,
        error: 'Error al conectar con el servidor',
        message:
          'Por favor, verifica tu conexión o intentalo de nuevo más tarde.',
      }
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
      const token = await this.getToken()
      if (!token) return false

      const isExpired = this.isTokenExpiringSoon(token)
      if (isExpired) {
        // Intentar refrescar el token
        const newToken = await this.refreshAccessToken()
        return !!newToken
      }

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async getToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY)
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async removeToken(): Promise<boolean> {
    try {
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async getCurrentUser() {
    const userJson = await SecureStore.getItemAsync(USER_SESSION_KEY)
    return userJson ? JSON.parse(userJson) : null
  }

  // Método para obtener una instancia del cliente Axios configurada
  getApiClient(): AxiosInstance {
    return this.api
  }
}

export default new AuthService()
