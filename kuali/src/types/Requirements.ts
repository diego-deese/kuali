import { UserDocument } from './UserDocument'

export type Requirements = {
  requirement_id: number
  name: string
  description: string
  userDocuments: UserDocument[]
}
