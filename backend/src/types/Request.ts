import { Request } from 'express'

export interface UserPayload {
  user_id: number
  institutional_email: string
  role_id: number
}

export interface AuthRequest extends Request {
  user?: UserPayload
}
