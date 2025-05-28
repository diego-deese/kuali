import { Prisma } from '../generated/client'

const createdRequirementTemplate = Prisma.validator<Prisma.RequirementTemplatesDefaultArgs>()({
  omit: {
    file_content: true,
    mimetype: true
  }
})

export type CreatedRequirementTemplate = Prisma.RequirementTemplatesGetPayload<typeof createdRequirementTemplate>

const newRequirementTemplate = Prisma.validator<Prisma.RequirementTemplatesDefaultArgs>()({
  select: {
    name: true,
    file_content: true,
    mimetype: true,
    requirement_id: true
  }
})

export type NewRequirementTemplate = Prisma.RequirementTemplatesGetPayload<typeof newRequirementTemplate>

const newActivityRequirementTemplate = Prisma.validator<Prisma.RequirementTemplatesDefaultArgs>()({
  select: {
    name: true,
    file_content: true,
    mimetype: true
  }
})

export type NewActivityRequirementTemplate = Prisma.RequirementTemplatesGetPayload<typeof newActivityRequirementTemplate>

const updateRequirementTemplate = Prisma.validator<Prisma.RequirementTemplatesDefaultArgs>()({
  select: {
    name: true,
    file_content: true,
    mimetype: true
  }
})

export type UpdateRequirementTemplate = Partial<Prisma.RequirementTemplatesGetPayload<typeof updateRequirementTemplate>>
