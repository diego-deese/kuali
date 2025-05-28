import { RequirementTemplate } from './RequirementTemplate'
import { UserDocument } from './UserDocument'

export type Requirements = {
  requirement_id: number
  name: string
  description: string
  template: {
    requirement_template_id: number
  } | null
  userDocuments: UserDocument[]
}

export type ActivityRequirement = {
  requirement_id: number
  name: string
  description: string
  template: RequirementTemplate | null
}
