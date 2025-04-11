import { AcademicPrograms } from '../generated/client'

export interface AcademicProgramAsStudent {
  program: {
    program_id: number
    name: string
    researcher_id: number | null
  }
}

export type AcademicProgramAsResearcher = Omit<AcademicPrograms, 'researcher_id'>
