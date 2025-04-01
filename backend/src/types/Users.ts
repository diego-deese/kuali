import { Users } from '../generated/client'

export type SafeUser = Omit<Users, 'password' | 'role_id'>

export type NewUser = Omit<Users, 'user_id'>

export interface UsersResponse {
  users: SafeUser[]
}

export interface UserResponse {
  user: SafeUser | null
}
