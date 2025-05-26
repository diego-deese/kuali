import { Prisma } from '../generated/client'
import { UpdateActivityRequirementTemplate } from './RequirementTemplates'

const newRequirement = Prisma.validator<Prisma.RequirementsDefaultArgs>()({
  select: {
    name: true,
    description: true,
    activity_id: true
  }
})

export type NewRequirement = Prisma.RequirementsGetPayload<typeof newRequirement>

const activityRequirement = Prisma.validator<Prisma.RequirementsDefaultArgs>()({
  select: {
    name: true,
    description: true,
    template: {
      select: {
        name: true,
        file_content: true,
        mimetype: true
      }
    }
  }
})

export type ActivityRequirement = Prisma.RequirementsGetPayload<typeof activityRequirement>

export interface UpdateActivityRequirement {
  requirement_id?: number
  name?: string
  description?: string
  template: UpdateActivityRequirementTemplate | null
}

const updateRequirement = Prisma.validator<Prisma.RequirementsDefaultArgs>()({
  select: {
    name: true,
    description: true
  }
})

export type UpdateRequirement = Prisma.RequirementsGetPayload<typeof updateRequirement>

export type PatchRequirement = Partial<UpdateRequirement>

const requirementInfo = Prisma.validator<Prisma.RequirementsDefaultArgs>()({
  select: {
    requirement_id: true,
    name: true,
    description: true
  }
})

export type RequirementInfo = Prisma.RequirementsGetPayload<typeof requirementInfo>
