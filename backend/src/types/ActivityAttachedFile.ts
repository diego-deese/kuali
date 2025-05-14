import { Prisma } from '../generated/client'

const createdAttachedFile = Prisma.validator<Prisma.ActivityAttachedFilesDefaultArgs>()({
  omit: {
    file_content: true,
    mimetype: true
  }
})

export type CreatedAttachedFile = Prisma.ActivityAttachedFilesGetPayload<typeof createdAttachedFile>
