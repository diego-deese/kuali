import { RESEARCHER_ROLE_ID } from '../constants/roles'
import { AcademicPrograms } from '../generated/client'
import prisma from '../lib/prisma'
import { NewAcademicProgram } from '../types/AcademicProgram'
import { NotFoundError, ValidationError } from '../types/Error'
import userService from './user.service'

class AcademicProgramService {
  async getAcademicPrograms (): Promise<AcademicPrograms[]> {
    const academicPrograms = await prisma.academicPrograms.findMany({
      where: {
        NOT: [
          {
            researcher_id: null
          }
        ]
      }
    })

    return academicPrograms
  }

  async getAcademicProgramsWithoutResearcher (): Promise<AcademicPrograms[]> {
    const academicPrograms = await prisma.academicPrograms.findMany({
      where: {
        researcher_id: null
      }
    })

    return academicPrograms
  }

  async getAcademicProgram (academicProgramId: number): Promise<AcademicPrograms> {
    const academicProgram = await prisma.academicPrograms.findFirst({
      where: {
        program_id: academicProgramId
      }
    })

    if (academicProgram === null) {
      throw new NotFoundError('No se econtró ningún programa académico con ese id')
    }

    return academicProgram
  }

  async createAcademicProgram (newAcademicProgramData: NewAcademicProgram): Promise<AcademicPrograms> {
    const academicProgram = await prisma.academicPrograms.create({
      data: newAcademicProgramData
    })

    return academicProgram
  }

  async deleteAcademicProgram (academicProgramId: number): Promise<boolean> {
    return await prisma.$transaction(async (prisma) => {
      await this.getAcademicProgram(academicProgramId)

      await prisma.inscriptions.deleteMany({
        where: {
          program_id: academicProgramId
        }
      })

      await prisma.academicPrograms.deleteMany({
        where: {
          program_id: academicProgramId
        }
      })

      return true
    })
  }

  async renameAcademicProgram (academicProgramId: number, name: string): Promise<AcademicPrograms> {
    const renamedAcademicProgram = await prisma.academicPrograms.update({
      where: {
        program_id: academicProgramId
      },
      data: {
        name
      }
    })

    return renamedAcademicProgram
  }

  async assignResearcher (academicProgramId: number, researcherId: number): Promise<AcademicPrograms> {
    const user = await userService.getUser(researcherId)

    if (user.role.role_id !== RESEARCHER_ROLE_ID) {
      throw new ValidationError('El usuario con el id proporcionado no es un investigador')
    }

    await this.getAcademicProgram(academicProgramId)

    const academicProgram = await prisma.academicPrograms.update({
      where: {
        program_id: academicProgramId
      },
      data: {
        researcher_id: researcherId
      }
    })

    return academicProgram
  }

  async unassignResearcher (academicProgramId: number, userId: number): Promise<AcademicPrograms> {
    await this.getAcademicProgram(academicProgramId)

    const updatedAcademicProgram = await prisma.academicPrograms.update({
      where: {
        program_id: academicProgramId,
        researcher_id: userId
      },
      data: {
        researcher_id: null
      }
    })

    return updatedAcademicProgram
  }

  async unassignResearcherFromAllPrograms (userId: number): Promise<void> {
    await prisma.academicPrograms.updateMany({
      where: {
        researcher_id: userId
      },
      data: {
        researcher_id: null
      }
    })
  }
}

export default new AcademicProgramService()
