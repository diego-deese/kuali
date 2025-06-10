import { Prisma } from '../generated/client'

const newNotification = Prisma.validator<Prisma.NotificationDefaultArgs>()({
  select: {
    title: true,
    message: true,
    activity_id: true,
    user_document_id: true,
    remind_date: true,
    notification_type_id: true,
    visible_researchers: true,
    visible_students: true,
    notify_all: true
  }
})

export type NewNotification = Prisma.NotificationGetPayload<typeof newNotification>
