export interface UserSession {
  access_token: string
  refresh_token: string
  user_id: number
  role: {
    role_id: number
    name: string
  }
}
