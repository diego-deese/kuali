import { Roles } from '../generated/client'

export interface UserSession {
  access_token: string
  refresh_token: string
  user_id: number
  role: Roles
}

export interface SessionTokens {
  access_token: string
  refresh_token: string
  hashedRefresh_token: string
}
