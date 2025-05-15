import { AttachedFile } from './AttachedFile'
import { UserDocument } from './UserDocument'

export type Requirements = {
  requirement_id: number
  name: string
  description: string
  userDocuments: UserDocument[]
}

export type ActivityRequirement = {
  requirement_id: number
  name: string
  description: string
  attached_file?: AttachedFile
}
