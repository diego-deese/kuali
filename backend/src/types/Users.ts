import { Roles, Users } from '../generated/client'
import { AcademicProgramAsResearcher, AcademicProgramAsStudent } from './AcademicProgram'

export type SafeUser = Omit<Users, 'password' | 'role_id' | 'profile_photo' | 'photo_mime_type'> & {
  role: Roles
  academic_programs_as_student?: AcademicProgramAsStudent[]
  academic_programs_as_researcher?: AcademicProgramAsResearcher[]
}

export type NewUser = Omit<Users, 'user_id'>

export interface UsersResponse {
  users: SafeUser[]
}

export interface UserResponse {
  user: SafeUser | null
}
