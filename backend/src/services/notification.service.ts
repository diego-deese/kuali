import { CALLS_CATEGORY_ID, EVENTS_CATEGORY_ID } from '../constants/activity-categories'
import { NotificationTypes } from '../constants/notification-types'
import { RESEARCHER_ROLE_ID, STUDENT_ROLE_ID } from '../constants/roles'
import { Notification, UserDocuments } from '../generated/client'
import prisma from '../lib/prisma'
import { CreatedActivity } from '../types/Activities'
import { NewNotification } from '../types/Notification'
import userService from './user.service'
import { startOfDay, endOfDay, subDays, addMinutes } from 'date-fns'

class NotificationService {
  async getUserNotifications (userId: number): Promise<Notification[]> {
    const user = await userService.getUser(userId)

    const today = startOfDay(new Date())
    const threeDaysAgo = subDays(today, 3)

    const notifications = await prisma.notification.findMany({
      where: {
        AND: [
          { remind_date: { gte: threeDaysAgo } },
          {
            remind_date: {
              gte: today,
              lte: endOfDay(today)
            }
          }
        ],
        OR: [
          {
            AND: [
              { notify_all: true },
              (user.role.role_id === STUDENT_ROLE_ID ? { visible_students: true } : {}),
              (user.role.role_id === RESEARCHER_ROLE_ID ? { visible_researchers: true } : {})
            ]
          },
          {
            recievers: {
              some: {
                user_id: userId
              }
            }
          }
        ]
      },
      orderBy: [
        {
          remind_date: 'desc'
        }
      ]
    })

    return notifications
  }

  async createNotification (newNotificationInfo: NewNotification): Promise<Notification> {
    const newNotification = await prisma.notification.create({
      data: newNotificationInfo
    })

    return newNotification
  }

  async createActivityReminderNotifications (newActivity: CreatedActivity): Promise<void> {
    if (newActivity.category.category_id === CALLS_CATEGORY_ID) {
      // Activity reminder
      await this.createNotification({
        title: 'Recordatorio de fecha límite',
        message: `La fecha límite de la convocatoria '${newActivity.title.trim()}' se acerca, recuerda cumplir con todos los requisitos.`,
        activity_id: newActivity.activity_id,
        visible_researchers: newActivity.visible_researchers,
        visible_students: newActivity.visible_students,
        user_document_id: null,
        notification_type_id: NotificationTypes.ACTIVITY_REMINDER,
        remind_date: endOfDay(subDays(newActivity.register_date_limit, 3)),
        notify_all: false
      })
      return
    }

    // Activity reminder (3 days before)
    await this.createNotification({
      title: 'Recordatorio de fecha de evento',
      message: `La fecha del evento '${newActivity.title.trim()}' se acerca ¡No olvides asistir!`,
      activity_id: newActivity.activity_id,
      visible_researchers: newActivity.visible_researchers,
      visible_students: newActivity.visible_students,
      user_document_id: null,
      notification_type_id: NotificationTypes.ACTIVITY_REMINDER,
      remind_date: subDays(addMinutes(newActivity.event_date, 1), 3),
      notify_all: false
    })

    // Activity reminder (1 day before)
    await this.createNotification({
      title: 'Recordatorio de fecha de evento',
      message: `La fecha del evento '${newActivity.title.trim()}' es mañana ¡No olvides asistir!`,
      activity_id: newActivity.activity_id,
      visible_researchers: newActivity.visible_researchers,
      visible_students: newActivity.visible_students,
      user_document_id: null,
      notification_type_id: NotificationTypes.ACTIVITY_REMINDER,
      remind_date: subDays(addMinutes(newActivity.event_date, 1), 1),
      notify_all: false
    })
  }

  async createNewActivityNotifications (newActivity: CreatedActivity): Promise<void> {
    // New activity notification
    await this.createNotification({
      title: newActivity.category.category_id === EVENTS_CATEGORY_ID ? 'Nuevo evento creado' : 'Nueva convocatoria creada',
      message: newActivity.category.category_id === EVENTS_CATEGORY_ID
        ? `Nuevo evento "${newActivity.title.trim()}" creado.${newActivity.mandatory ? ' Su registro es obligatorio.' : ''}`
        : `Nueva convocatoria "${newActivity.title.trim()}" creada.${newActivity.mandatory ? ' Su registro es obligatorio.' : ''}`,
      activity_id: newActivity.activity_id,
      visible_researchers: newActivity.visible_researchers,
      visible_students: newActivity.visible_students,
      user_document_id: null,
      notification_type_id: NotificationTypes.ACTIVITY_CREATED_ID,
      remind_date: new Date(),
      notify_all: true
    })

    await this.createActivityReminderNotifications(newActivity)
  }

  async createActivityUpdatedNotification (activityInfo: CreatedActivity): Promise<void> {
    await prisma.notification.deleteMany({
      where: {
        activity_id: activityInfo.activity_id,
        notification_type_id: NotificationTypes.ACTIVITY_REMINDER
      }
    })

    await this.createActivityReminderNotifications(activityInfo)

    await this.createNotification({
      title: 'Datos de actividad actualizada',
      message: `Los datos de la ${activityInfo.category.category_id === EVENTS_CATEGORY_ID ? 'evento' : 'convocatoria'} "${activityInfo.title.trim()}" han sido actualizados. Asegúrate de revisar los nuevos detalles${activityInfo.mandatory ? ', recuerda que su registro es obligatorio.' : '.'}`,
      activity_id: activityInfo.activity_id,
      visible_researchers: activityInfo.visible_researchers,
      visible_students: activityInfo.visible_students,
      user_document_id: null,
      notification_type_id: NotificationTypes.ACTIVITY_UPDATED,
      remind_date: new Date(),
      notify_all: true
    })
  }

  async createApprovedDocumentNotification (userDocumentInfo: UserDocuments): Promise<void> {
    const activity = await prisma.activities.findFirst({
      where: {
        requirements: {
          some: {
            userDocuments: {
              some: {
                user_document_id: userDocumentInfo.user_document_id
              }
            }
          }
        }
      },
      select: {
        title: true,
        requirements: {
          select: {
            name: true,
            userDocuments: {
              select: {
                registration: {
                  select: {
                    user_id: true
                  }
                }
              }
            }
          }
        }
      }
    })

    const newNotification = await this.createNotification({
      title: 'Documento de usuario aprovado',
      message: `Tu documento "${activity?.requirements?.[0]?.name ?? ''}" para la convocatoria "${activity?.title ?? ''}" ha sido revisado y aprobado.`,
      visible_researchers: true,
      visible_students: true,
      activity_id: null,
      user_document_id: userDocumentInfo.user_document_id,
      notification_type_id: NotificationTypes.DOCUMENT_REVIEW,
      remind_date: new Date(),
      notify_all: false
    })

    const userId = activity?.requirements[0]?.userDocuments[0]?.registration.user_id
    if (typeof userId === 'number') {
      await prisma.notificationReciever.create({
        data: {
          notification_id: newNotification.notification_id,
          user_id: userId
        }
      })
    } else {
      throw new Error('No se pudo encontrar el user_id para la notificación de documento aprobado.')
    }
  }

  async createRejectedDocumentNotification (userDocumentInfo: UserDocuments): Promise<void> {
    const activity = await prisma.activities.findFirst({
      where: {
        requirements: {
          some: {
            userDocuments: {
              some: {
                user_document_id: userDocumentInfo.user_document_id
              }
            }
          }
        }
      },
      select: {
        title: true,
        requirements: {
          select: {
            name: true,
            userDocuments: {
              select: {
                registration: {
                  select: {
                    user_id: true
                  }
                }
              }
            }
          }
        }
      }
    })

    const newNotification = await this.createNotification({
      title: 'Documento de usuario aprovado',
      message: `Tu documento "${activity?.requirements?.[0]?.name ?? ''}" para la convocatoria "${activity?.title ?? ''}" ha sido revisado y fue rechazado. Puedes volver a subirlo antes de la fecha límite de registro de la convocatoria.`,
      visible_researchers: true,
      visible_students: true,
      activity_id: null,
      user_document_id: userDocumentInfo.user_document_id,
      notification_type_id: NotificationTypes.DOCUMENT_REVIEW,
      remind_date: new Date(),
      notify_all: false
    })

    const userId = activity?.requirements[0]?.userDocuments[0]?.registration.user_id
    if (typeof userId === 'number') {
      await prisma.notificationReciever.create({
        data: {
          notification_id: newNotification.notification_id,
          user_id: userId
        }
      })
    } else {
      throw new Error('No se pudo encontrar el user_id para la notificación de documento aprobado.')
    }
  }
}

export default new NotificationService()
