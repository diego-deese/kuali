export interface ResponseError {
  success: false
  message: string
  error: string
}

export interface Response<T> {
  success: true
  data: T
}

export interface ArrayResponse<T> {
  success: true
  data: T[]
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

export interface Message {
  message: string
}

export interface ApiResponse<T> {
  success: true
  data: T
}
