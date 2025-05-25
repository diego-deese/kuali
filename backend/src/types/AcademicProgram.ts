import { AcademicPrograms, Prisma } from '../generated/client'
import { StudentInProgram } from './Users'

export interface AcademicProgramAsStudent {
  program: {
    program_id: number
    name: string
    researcher_id: number | null
  }
}

export type AcademicProgramAsResearcher = Omit<AcademicPrograms, 'researcher_id'>

const programName = Prisma.validator<Prisma.AcademicProgramsDefaultArgs>()({
  select: {
    name: true
  }
})

export type AcademicProgramWithStudents = Prisma.AcademicProgramsGetPayload<typeof programName> & {
  students: StudentInProgram[]
}

const newAcademicProgram = Prisma.validator<Prisma.AcademicProgramsDefaultArgs>()({
  select: {
    name: true,
    researcher_id: true
  }
})

export type NewAcademicProgram = Prisma.AcademicProgramsGetPayload<typeof newAcademicProgram>

export type PatchAcademicProgram = Partial<NewAcademicProgram>
