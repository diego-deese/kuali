import { CALLS_CATEGORY_ID, EVENTS_CATEGORY_ID } from '../constants/activity-categories'
import { NotificationTypes } from '../constants/notification-types'
import { RESEARCHER_ROLE_ID, STUDENT_ROLE_ID } from '../constants/roles'
import { Notification } from '../generated/client'
import prisma from '../lib/prisma'
import { CreatedActivity } from '../types/Activities'
import { NewNotification } from '../types/Notification'
import userService from './user.service'
import { startOfDay, endOfDay, subDays } from 'date-fns'

class NotificationService {
  async getUserNotifications (userId: number): Promise<Notification[]> {
    const user = await userService.getUser(userId)

    const today = startOfDay(new Date())
    const threeDaysAgo = subDays(today, 3)

    console.log(today)

    const notifications = await prisma.notification.findMany({
      where: {
        OR: [
          {
            AND: [
              { reciever_id: userId },
              { remind_date: { gte: threeDaysAgo } }
            ]
          },
          {
            AND: [
              { reciever_id: null },
              { remind_date: { gte: threeDaysAgo } }
            ]
          },
          {
            remind_date: {
              gte: today,
              lt: endOfDay(today)
            }
          }
        ],
        ...(user.role.role_id === STUDENT_ROLE_ID ? { visible_students: true } : {}),
        ...(user.role.role_id === RESEARCHER_ROLE_ID ? { visible_researchers: true } : {})
      },
      orderBy: {
        remind_date: 'desc'
      }
    })

    return notifications
  }

  async createNotification (newNotificationInfo: NewNotification): Promise<Notification> {
    const newNotification = await prisma.notification.create({
      data: newNotificationInfo
    })

    return newNotification
  }

  async createNewActivityNotifications (newActivity: CreatedActivity): Promise<void> {
    // New activity notification
    await this.createNotification({
      title: newActivity.category.category_id === EVENTS_CATEGORY_ID ? 'Nuevo evento creado' : 'Nueva convocatoria creada',
      message: newActivity.category.category_id === EVENTS_CATEGORY_ID
        ? `Nuevo evento '${newActivity.title.trim()}' creado.`
        : `Nueva convocatoria '${newActivity.title.trim()}' creada.`,
      activity_id: newActivity.activity_id,
      visible_researchers: newActivity.visible_researchers,
      visible_students: newActivity.visible_students,
      user_document_id: null,
      reciever_id: null,
      notification_type_id: NotificationTypes.ACTIVITY_CREATED_ID,
      remind_date: new Date()
    })

    if (newActivity.category.category_id === CALLS_CATEGORY_ID) {
      // Activity reminder
      await this.createNotification({
        title: 'Recordatorio de fecha límite',
        message: `La fecha límite de la convocatoria '${newActivity.title.trim()}' se acerca, recuerda cumplir con todos los requisitos.`,
        activity_id: newActivity.activity_id,
        visible_researchers: newActivity.visible_researchers,
        visible_students: newActivity.visible_students,
        user_document_id: null,
        reciever_id: null,
        notification_type_id: NotificationTypes.ACTIVITY_REMINDER,
        remind_date: subDays(newActivity.register_date_limit, 3)
      })
    }
  }
}

export default new NotificationService()
