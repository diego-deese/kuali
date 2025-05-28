import { Requirements } from '../generated/client'
import prisma from '../lib/prisma'
import { NotFoundError } from '../types/Error'
import { NewRequirement, UpdateRequirement } from '../types/Requirement'
import activityService from './activity.service'

class RequirementService {
  async getRequirement (requirementId: number): Promise<Requirements> {
    const requirement = await prisma.requirements.findFirst({
      where: {
        requirement_id: requirementId
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
      data: requirementData
    })

    return updatedRequirement
  }
}

export default new RequirementService()
