import { Prisma, Roles, Users } from '../generated/client'
import { AcademicProgramAsResearcher, AcademicProgramAsStudent } from './AcademicProgram'

export type SafeUser = Omit<Users, 'password' | 'role_id' | 'profile_photo' | 'photo_mime_type'> & {
  role: Roles
  academic_programs_as_student?: AcademicProgramAsStudent[]
  academic_programs_as_researcher?: AcademicProgramAsResearcher[]
}

const newUser = Prisma.validator<Prisma.UsersDefaultArgs>()({
  select: {
    name: true,
    second_name: true,
    paternal_lastname: true,
    maternal_lastname: true,
    identifier: true,
    institutional_email: true,
    personal_email: true,
    curp: true,
    profile_photo: true,
    photo_mime_type: true,
    password: true,
    role_id: true,
    categoriaProfr: true,
    cvuNumber: true,
    employeeNumber: true,
    namingNumber: true,
    namingType: true,
    placementType: true,
    researchLine: true,
    sniDistinction: true,
    socialSecurityNumber: true,
    validity: true,
    ediLevel: true
  }
})

export type NewUser = Prisma.UsersGetPayload<typeof newUser>

const updatedUser = Prisma.validator<Prisma.UsersDefaultArgs>()({
  select: {
    name: true,
    second_name: true,
    paternal_lastname: true,
    maternal_lastname: true,
    identifier: true,
    institutional_email: true,
    personal_email: true,
    curp: true,
    profile_photo: true,
    photo_mime_type: true,
    categoriaProfr: true,
    cvuNumber: true,
    employeeNumber: true,
    namingNumber: true,
    namingType: true,
    placementType: true,
    researchLine: true,
    sniDistinction: true,
    socialSecurityNumber: true,
    validity: true,
    ediLevel: true
  }
})

export type UpdatedUser = Prisma.UsersGetPayload<typeof updatedUser>

export type OptionalUpdatedUser = Partial<UpdatedUser>

export type UserProfilePhoto = Pick<Users, 'profile_photo' | 'photo_mime_type'>

const studentInProgram = Prisma.validator<Prisma.UsersDefaultArgs>()({
  select: {
    user_id: true,
    name: true,
    second_name: true,
    paternal_lastname: true,
    maternal_lastname: true,
    identifier: true,
    institutional_email: true
  }
})

export type StudentInProgram = Prisma.UsersGetPayload<typeof studentInProgram>

const userBasicInfo = Prisma.validator<Prisma.UsersDefaultArgs>()({
  select: {
    user_id: true,
    name: true,
    second_name: true,
    paternal_lastname: true,
    maternal_lastname: true
  }
})

export type UserBasicInfo = Prisma.UsersGetPayload<typeof userBasicInfo>
