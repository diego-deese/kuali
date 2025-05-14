import { Prisma } from '../generated/client'

const newRequirement = Prisma.validator<Prisma.RequirementsDefaultArgs>()({
  select: {
    name: true,
    description: true,
    activity_id: true
  }
})

export type NewRequirement = Prisma.RequirementsGetPayload<typeof newRequirement>

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
