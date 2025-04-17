import { Roles } from '../generated/client'

export interface UserSession {
  tokens: {
    access_token: string
    refresh_token: string
  }
  user: {
    user_id: number
    role: Roles
  }
}

export interface SessionTokens {
  access_token: string
  refresh_token: string
}
