import { Role } from './Role'

export type User = {
  name: string
  second_name: string
  paternal_lastname: string
  maternal_lastname: string
  institutional_email: string
  personal_email: string
  curp: string
  identifier: string
  user_id: number
  role: Role
  academic_programs_as_student?: {
    program_id: number
    name: string
    researcher_id?: number
  }[]
}

export type NewUser = {
  name: string
  second_name: string
  paternal_lastname: string
  maternal_lastname: string
  curp: string
  identifier: string
  institutional_email: string
  password: string
  role_id: number
}
