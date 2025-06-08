export type Notification = {
  notification_id: number
  creation_date: string
  title: string
  message: string
  read_status: boolean
  read_date: string | null
  visible_students: boolean
  visible_researchers: boolean
  activity_id: number | null
  user_document_id: number | null
  reciever_id: number | null
  notification_type_id: number
}
