import { User } from '../types/User'

export const buildStudentParams = (student: User, index: number) => ({
  user_id: student.user_id.toString(),
  name: student.name,
  second_name: student.second_name ?? '', // If no has a second name
  paternal_lastname: student.paternal_lastname,
  maternal_lastname: student.maternal_lastname,
  identifier: student.identifier,
  institutional_email: student.institutional_email,
  index: index.toString(),
})
