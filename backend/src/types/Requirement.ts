import { Prisma } from '../generated/client'

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

const updateRequirement = Prisma.validator<Prisma.RequirementsDefaultArgs>()({
  select: {
    name: true,
    description: true
  }
})

export type UpdateRequirement = Partial<Prisma.RequirementsGetPayload<typeof updateRequirement>>

const requirementInfo = Prisma.validator<Prisma.RequirementsDefaultArgs>()({
  select: {
    requirement_id: true,
    name: true,
    description: true
  }
})

export type RequirementInfo = Prisma.RequirementsGetPayload<typeof requirementInfo>
