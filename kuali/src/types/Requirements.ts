import { UserDocument } from './UserDocument'

export type Requirements = {
  requirement_id: number
  name: string
  description: string
  template?: {
    requirement_template_id: number
  }
  userDocuments: UserDocument[]
}

export type ActivityRequirement = {
  requirement_id: number
  name: string
  description: string
  template_uri?: string
}
