export interface ResponseError {
  success: false
  message: string
  error: string
}

export interface Response<T> {
  success: true
  data: T | T[]
}

export interface AuthResponse {
  success: true
  tokens: {
    access_token: string
    refresh_token: string
  }
  user: {
    user_id: number
    role: {
      role_id: number
      name: string
    }
  }
}
