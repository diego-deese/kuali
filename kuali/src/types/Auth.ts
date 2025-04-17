export interface AuthResponse {
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
