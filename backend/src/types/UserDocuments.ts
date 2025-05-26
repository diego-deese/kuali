import { Prisma } from '../generated/client'
import { RequirementInfo } from './Requirement'
import { UserBasicInfo } from './Users'

export interface RequirementDocumentInfo {
  user_document_id: number
  status: {
    revision_status_id: number
    name: string
  }
  user: {
    user_id: number
    name: string
    second_name: string | null
    paternal_lastname: string
    maternal_lastname: string
  }
}

export interface RequirementUserDocuments {
  requirement: RequirementInfo
  userDocuments: RequirementDocumentInfo[]
}

export interface UserDocumentInfo {
  user_document_id: number
  status: {
    revision_status_id: number
    name: string
  }
  requirement: {
    requirement_id: number
    name: string
    description: string
  }
}

export interface UserUserDocuments {
  user: UserBasicInfo
  userDocuments: UserDocumentInfo[]
}

const newUserDocument = Prisma.validator<Prisma.UserDocumentsDefaultArgs>()({
  select: {
    file_name: true,
    file_content: true,
    mimetype: true,
    requirement_id: true
  }
})

export type NewUserDocument = Prisma.UserDocumentsGetPayload<typeof newUserDocument>

const updateUserDocument = Prisma.validator<Prisma.UserDocumentsDefaultArgs>()({
  select: {
    file_name: true,
    file_content: true,
    mimetype: true
  }
})

export type UpdateUserDocument = Prisma.UserDocumentsGetPayload<typeof updateUserDocument>
