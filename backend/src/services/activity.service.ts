import { Activities } from '../generated/client'
import prisma from '../lib/prisma'
import { ActivityInfo, UserAccesibleActivity } from '../types/Activities'
import { NotFoundError } from '../types/Error'
import registrationService from './registration.service'

class ActivityService {
  async getActivities (): Promise<UserAccesibleActivity[]> {
    const activities = await prisma.activities.findMany({
      omit: {
        creation_date: true,
        last_updated: true,
        admin_creator_id: true,
        location_id: true,
        category_id: true
      },
      include: {
        category: true,
        location: true
      }
    })

    return activities
  }

  async getActivity (activityId: number): Promise<UserAccesibleActivity> {
    const activity = await prisma.activities.findFirst({
      where: {
        activity_id: activityId
      },
      omit: {
        creation_date: true,
        last_updated: true,
        admin_creator_id: true,
        location_id: true,
        category_id: true
      },
      include: {
        category: true,
        location: true,
        requirements: {
          omit: {
            activity_id: true,
            last_updated: true
          }
        }
      }
    })

    if (activity === null) {
      throw new NotFoundError('No se encontró ningún evento ni convocatoria con ese id')
    } else {
      return activity
    }
  }

  async getActivityWithUserDetails (activityId: number, userId: number): Promise<UserAccesibleActivity> {
    const registrationExists = await registrationService.verifyRegistration(userId, activityId)

    let activity, isRegistered

    if (registrationExists === true) {
      activity = await prisma.activities.findFirst({
        where: {
          activity_id: activityId
        },
        omit: {
          creation_date: true,
          last_updated: true,
          admin_creator_id: true,
          location_id: true,
          category_id: true
        },
        include: {
          category: true,
          location: true,
          requirements: {
            omit: {
              activity_id: true,
              last_updated: true
            },
            include: {
              userDocuments: {
                select: {
                  status: true
                },
                where: {
                  registration: {
                    user_id: userId
                  }
                }
              }
            }
          }
        }
      })

      isRegistered = true
    } else {
      activity = await this.getActivity(activityId)
      isRegistered = false
    }

    if (activity === null) {
      throw new NotFoundError('No se encontró ningún evento ni convocatoria con ese id')
    } else {
      return { ...activity, isRegistered }
    }
  }

  async createActivity (activityData: Activities): Promise<UserAccesibleActivity> {
    const newActivity = await prisma.activities.create({
      data: {
        ...activityData
      },
      omit: {
        location_id: true,
        category_id: true
      },
      include: {
        category: true,
        location: true
      }
    })

    return newActivity
  }

  async deleteActivity (activityId: number): Promise<Boolean> {
    await prisma.$transaction([
      prisma.userDocuments.deleteMany({
        where: {
          registration: {
            activity_id: activityId
          }
        }
      }),
      prisma.userDocuments.deleteMany({
        where: {
          requirement: {
            activity_id: activityId
          }
        }
      }),
      prisma.requirements.deleteMany({
        where: { activity_id: activityId }
      }),
      prisma.activityAttachedFiles.deleteMany({
        where: { activity_id: activityId }
      }),
      prisma.registrations.deleteMany({
        where: { activity_id: activityId }
      }),
      prisma.activities.delete({
        where: { activity_id: activityId }
      })
    ])

    return true
  }

  async getUserUpcomingActivities (userId: number): Promise<UserAccesibleActivity[]> {
    const activities = await prisma.activities.findMany({
      where: {
        users: {
          some: {
            user_id: userId
          }
        },
        event_date: {
          gte: new Date()
        }
      },
      include: {
        location: true,
        category: true,
        requirements: {
          omit: {
            activity_id: true,
            last_updated: true
          },
          include: {
            userDocuments: {
              select: {
                status: true
              }
            }
          }
        }
      },
      omit: {
        creation_date: true,
        last_updated: true,
        mandatory: true,
        visible_researchers: true,
        visible_students: true,
        admin_creator_id: true,
        location_id: true,
        category_id: true
      }
    })

    return activities
  }

  async getUserPastActivities (userId: number): Promise<UserAccesibleActivity[]> {
    const activities = await prisma.activities.findMany({
      where: {
        users: {
          some: {
            user_id: userId
          }
        },
        event_date: {
          lt: new Date()
        }
      },
      include: {
        location: true,
        category: true,
        requirements: {
          omit: {
            activity_id: true,
            last_updated: true
          },
          include: {
            userDocuments: {
              select: {
                status: true
              }
            }
          }
        }
      },
      omit: {
        creation_date: true,
        last_updated: true,
        mandatory: true,
        visible_researchers: true,
        visible_students: true,
        admin_creator_id: true,
        location_id: true,
        category_id: true
      }
    })

    return activities
  }

  async getUpcomingActivities (): Promise<ActivityInfo[]> {
    const activities = await prisma.activities.findMany({
      select: {
        activity_id: true,
        title: true,
        description: true,
        event_date: true,
        register_date_limit: true,
        location: true,
        category: true
      },
      where: {
        event_date: {
          gte: new Date()
        }
      }
    })

    return activities
  }
}

export default new ActivityService()
