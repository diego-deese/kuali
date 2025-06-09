import { RESEARCHER_ROLE_ID, STUDENT_ROLE_ID } from '../constants/roles'
import { Notification } from '../generated/client'
import prisma from '../lib/prisma'
import { NewNotification } from '../types/Notification'
import userService from './user.service'

class NotificationService {
  async getUserNotifications (userId: number): Promise<Notification[]> {
    const user = await userService.getUser(userId)

    const notifications = await prisma.notification.findMany({
      where: {
        OR: [
          { reciever_id: userId },
          { reciever_id: null }
        ],
        ...(user.role.role_id === STUDENT_ROLE_ID ? { visible_students: true } : {}),
        ...(user.role.role_id === RESEARCHER_ROLE_ID ? { visible_researchers: true } : {})
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
}

export default new NotificationService()
