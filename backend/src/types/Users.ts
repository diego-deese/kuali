import { Prisma, Roles, Users } from '../generated/client'
import { AcademicProgramAsResearcher, AcademicProgramAsStudent } from './AcademicProgram'

export type SafeUser = Omit<Users, 'password' | 'role_id' | 'profile_photo' | 'photo_mime_type'> & {
  role: Roles
  academic_programs_as_student?: AcademicProgramAsStudent[]
  academic_programs_as_researcher?: AcademicProgramAsResearcher[]
}

export type NewUser = Omit<Users, 'user_id'>

export type UserProfilePhoto = Pick<Users, 'profile_photo' | 'photo_mime_type'>

const studentInProgram = Prisma.validator<Prisma.UsersDefaultArgs>()({
  select: {
    name: true,
    second_name: true,
    paternal_lastname: true,
    maternal_lastname: true,
    identifier: true,
    institutional_email: true
  }
})

export type StudentInProgram = Prisma.UsersGetPayload<typeof studentInProgram>
