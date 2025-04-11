export interface UserSession {
  access_token: string
  refresh_token: string
}

export interface SessionTokens {
  access_token: string
  refresh_token: string
  hashedRefresh_token: string
}
