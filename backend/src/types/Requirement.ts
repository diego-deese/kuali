import { Prisma } from '../generated/client'
import { NewActivityRequirementTemplate } from './RequirementTemplates'

const newRequirement = Prisma.validator<Prisma.RequirementsDefaultArgs>()({
  select: {
    name: true,
    description: true,
    activity_id: true
  }
})

export type NewRequirement = Prisma.RequirementsGetPayload<typeof newRequirement>

const requirement = Prisma.validator<Prisma.RequirementsDefaultArgs>()({
  select: {
    name: true,
    description: true,
    template: true
  }
})

export type Requirement = Prisma.RequirementsGetPayload<typeof requirement>

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

const updateRequirement = Prisma.validator<Prisma.RequirementsDefaultArgs>()({
  select: {
    name: true,
    description: true
  }
})

export type UpdateRequirement = Partial<Prisma.RequirementsGetPayload<typeof updateRequirement>> & {
  requirement_id: number
  template: NewActivityRequirementTemplate | null
}

const requirementInfo = Prisma.validator<Prisma.RequirementsDefaultArgs>()({
  select: {
    requirement_id: true,
    name: true,
    description: true
  }
})

export type RequirementInfo = Prisma.RequirementsGetPayload<typeof requirementInfo>
