import { Requirements } from '../generated/client'
import prisma from '../lib/prisma'
import { NotFoundError } from '../types/Error'
import { NewRequirement, Requirement, UpdateRequirement } from '../types/Requirement'
import activityService from './activity.service'

class RequirementService {
  async getRequirement (requirementId: number): Promise<Requirement> {
    const requirement = await prisma.requirements.findFirst({
      where: {
        requirement_id: requirementId
      },
      include: {
        template: true
      }
    })

    if (requirement === null) {
      throw new NotFoundError('No se encontró ningún requisito con ese id')
    }

    return requirement
  }

  async createRequirement (requirementData: NewRequirement): Promise<Requirements> {
    await activityService.getActivity(requirementData.activity_id)

    const newRequirement = await prisma.requirements.create({
      data: requirementData
    })

    return newRequirement
  }

  async updateRequirement (requirementId: number, requirementData: UpdateRequirement): Promise<Requirements> {
    await this.getRequirement(requirementId)

    const updatedRequirement = await prisma.requirements.update({
      where: {
        requirement_id: requirementId
      },
      data: {
        ...requirementData,
        template: (requirementData.template !== null)
          ? {
              update: requirementData.template
            }
          : undefined
      }
    })

    return updatedRequirement
  }

  async deleteRequirement (requirementId: number): Promise<boolean> {
    await this.getRequirement(requirementId)

    return await prisma.$transaction(async (prisma) => {
      await prisma.requirementTemplates.deleteMany({
        where: {
          requirement_id: requirementId
        }
      })

      await prisma.userDocuments.deleteMany({
        where: {
          requirement_id: requirementId
        }
      })

      await prisma.requirements.delete({
        where: {
          requirement_id: requirementId
        }
      })

      return true
    })
  }
}

export default new RequirementService()
