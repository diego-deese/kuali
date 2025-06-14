import { CALLS_CATEGORY_ID, EVENTS_CATEGORY_ID } from '../constants/activity-categories'
import { RESEARCHER_ROLE_ID, STUDENT_ROLE_ID } from '../constants/roles'
import prisma from '../lib/prisma'
import { ActivityInfo, ActivityPoster, CreatedActivity, NewActivity, UpdateActivity, UserAccesibleActivity } from '../types/Activities'
import { NotFoundError } from '../types/Error'
import notificationService from './notification.service'
import registrationService from './registration.service'
import requirementTemplateService from './requirement-template.service'
import requirementService from './requirement.service'

class ActivityService {
  async getActivities (): Promise<UserAccesibleActivity[]> {
    const activities = await prisma.activities.findMany({
      omit: {
        creation_date: true,
        last_updated: true,
        admin_creator_id: true,
        location_id: true,
        category_id: true,
        poster_image: true,
        poster_mimetype: true
      },
      include: {
        category: true,
        location: true
      },
      orderBy: {
        event_date: 'asc'
      }
    })

    return activities
  }

  async getActivitiesByRole (roleId: number): Promise<UserAccesibleActivity[]> {
    const activities = await prisma.activities.findMany({
      omit: {
        creation_date: true,
        last_updated: true,
        admin_creator_id: true,
        location_id: true,
        category_id: true,
        poster_image: true,
        poster_mimetype: true
      },
      include: {
        category: true,
        location: true
      },
      where: {
        OR: [
          roleId === STUDENT_ROLE_ID ? { visible_students: true } : {},
          roleId === RESEARCHER_ROLE_ID ? { visible_researchers: true } : {}
        ]
      },
      orderBy: {
        event_date: 'asc'
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
        category_id: true,
        poster_image: true,
        poster_mimetype: true
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
            template: {
              select: {
                requirement_template_id: true,
                last_updated: true,
                name: true,
                upload_date: true
              }
            }
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

    if (registrationExists) {
      activity = await prisma.activities.findFirst({
        where: {
          activity_id: activityId
        },
        omit: {
          creation_date: true,
          last_updated: true,
          admin_creator_id: true,
          location_id: true,
          category_id: true,
          poster_image: true,
          poster_mimetype: true
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
                  user_document_id: true,
                  status: true
                },
                where: {
                  registration: {
                    user_id: userId
                  }
                }
              },
              template: {
                select: {
                  requirement_template_id: true,
                  last_updated: true,
                  name: true,
                  upload_date: true
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

  async createActivity (activityData: NewActivity): Promise<CreatedActivity> {
    const { requirements, ...activityDetails } = activityData

    const newActivity = await prisma.$transaction(async (prisma) => {
      // Create the new activity
      const activity = await prisma.activities.create({
        data: {
          ...activityDetails
        },
        omit: {
          location_id: true,
          category_id: true,
          poster_image: true,
          poster_mimetype: true
        },
        include: {
          category: true,
          location: true,
          requirements: true
        }
      })

      // If the activity has requirements, then create them
      if (requirements !== null && requirements.length > 0) {
        for (const req of requirements) {
          const { template, ...requirementDetails } = req

          const newRequirement = await prisma.requirements.create({
            data: {
              ...requirementDetails,
              activity_id: activity.activity_id
            }
          })

          // If the requirement has a template, then create it
          if (template !== null) {
            await prisma.requirementTemplates.create({
              data: {
                ...template,
                requirement_id: newRequirement.requirement_id
              }
            })
          }
        }
      }

      // Return the created activity
      return await prisma.activities.findFirst({
        where: { activity_id: activity.activity_id },
        omit: {
          location_id: true,
          category_id: true,
          poster_image: true,
          poster_mimetype: true
        },
        include: {
          category: true,
          location: true,
          requirements: {
            include: {
              template: {
                select: {
                  requirement_template_id: true,
                  name: true
                }
              }
            }
          }
        }
      })
    })

    if (newActivity === null) {
      throw new Error('No se pudo crear la actividad')
    }

    // Subscribe users if the activity is mandatory
    if (activityDetails.mandatory) {
      const rolesToSubscribe: number[] = []

      if (activityDetails.visible_students) {
        rolesToSubscribe.push(STUDENT_ROLE_ID)
      }

      if (activityDetails.visible_researchers) {
        rolesToSubscribe.push(RESEARCHER_ROLE_ID)
      }

      await registrationService.registerUsersToActivity(rolesToSubscribe, newActivity.activity_id)
    }

    await notificationService.createNewActivityNotifications(newActivity)

    return newActivity
  }

  async deleteActivity (activityId: number): Promise<Boolean> {
    const activity = this.getActivity(activityId)

    if (activity === null) {
      throw new NotFoundError('No se encontró ninguna actividad con ese id')
    }

    await prisma.$transaction([
      prisma.notificationReciever.deleteMany({
        where: {
          notification: {
            activity_id: activityId
          }
        }
      }),
      prisma.notification.deleteMany({
        where: {
          activity_id: activityId
        }
      }),
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
      prisma.requirementTemplates.deleteMany({
        where: {
          requirement: {
            activity_id: activityId
          }
        }
      }),
      prisma.requirements.deleteMany({
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

  async updateActivity (activityId: number, activityData: UpdateActivity): Promise<CreatedActivity> {
    const updatedActivity = await prisma.$transaction(async (prisma) => {
      await this.getActivity(activityId)

      // Deconstruct the object
      const {
        requirements_to_add: requirementsToAdd,
        requirements_to_edit: requirementsToEdit, requirements_to_delete: requirementsToDelete,
        ...activityInfo
      } = activityData

      // Process editted requirements and its templates
      if (requirementsToEdit !== undefined) {
        for (const requirement of requirementsToEdit) {
          const requirementToUpdate = await requirementService.getRequirement(requirement.requirement_id)

          // If the requirement had a template but a null template is passed we delete the template
          if (requirementToUpdate.template !== null && requirement.template === null) {
            await requirementTemplateService.deleteTemplateFile(requirementToUpdate.template.requirement_template_id)
          }

          // If the requirement didn't had a template and a template is passed we add the template
          if (requirementToUpdate.template === null && requirement.template !== null) {
            await requirementTemplateService.uploadFile({ ...requirement.template, requirement_id: requirement.requirement_id })
          }

          // If the requirement had a template and a template is passed we update the template
          if (requirementToUpdate.template !== null && requirement.template !== null) {
            await requirementTemplateService.updateTemplateFile(requirementToUpdate.template.requirement_template_id, requirement.template)
          }

          await requirementService.updateRequirement(requirement.requirement_id, requirement)
        }
      }

      // Process added requirements and its templates
      if (requirementsToAdd !== undefined) {
        for (const requirement of requirementsToAdd) {
          const { template: requirementTemplate, ...requirementInfo } = requirement

          const addedRequirement = await requirementService.createRequirement({ ...requirementInfo, activity_id: activityId })

          if (requirement.template !== null) {
            await requirementTemplateService.uploadFile({ ...requirement.template, requirement_id: addedRequirement.requirement_id })
          }
        }
      }

      if (requirementsToDelete !== undefined) {
        for (const requirementId of requirementsToDelete) {
          await requirementService.deleteRequirement(requirementId)
        }
      }

      const activityToUpdate = await prisma.activities.findFirst({
        where: {
          activity_id: activityId
        },
        select: {
          requirements: true
        }
      })

      // Process activity update
      return await prisma.activities.update({
        where: {
          activity_id: activityId
        },
        data: {
          ...activityInfo,
          category_id: activityToUpdate?.requirements.length === 0 ? EVENTS_CATEGORY_ID : CALLS_CATEGORY_ID
        },
        omit: {
          location_id: true,
          category_id: true,
          poster_image: true,
          poster_mimetype: true
        },
        include: {
          category: true,
          location: true,
          requirements: {
            include: {
              template: {
                select: {
                  requirement_template_id: true,
                  name: true
                }
              }
            }
          }
        }
      })
    })

    // Subscribe users if the activity is mandatory
    if (updatedActivity.mandatory) {
      const rolesToSubscribe: number[] = []

      if (updatedActivity.visible_students) {
        rolesToSubscribe.push(STUDENT_ROLE_ID)
      }

      if (updatedActivity.visible_researchers) {
        rolesToSubscribe.push(RESEARCHER_ROLE_ID)
      }

      await registrationService.registerUsersToActivity(rolesToSubscribe, updatedActivity.activity_id)
    }

    await notificationService.createActivityUpdatedNotification(updatedActivity)

    return updatedActivity
  }

  async getUserUpcomingActivities (userId: number): Promise<UserAccesibleActivity[]> {
    const activities = await prisma.registrations.findMany({
      select: {
        activity: {
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
                    user_document_id: true,
                    status: true
                  }
                }
              }
            }
          },
          omit: {
            poster_image: true,
            poster_mimetype: true,
            creation_date: true,
            last_updated: true,
            visible_researchers: true,
            visible_students: true,
            admin_creator_id: true,
            location_id: true,
            category_id: true
          }
        }
      },
      where: {
        user_id: userId,
        activity: {
          event_date: {
            gte: new Date()
          }
        }
      },
      orderBy: {
        activity: {
          event_date: 'asc'
        }
      }
    })

    return activities.map((activity) => {
      return activity.activity
    })
  }

  async getUserPastActivities (userId: number): Promise<UserAccesibleActivity[]> {
    const activities = await prisma.registrations.findMany({
      select: {
        activity: {
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
                    user_document_id: true,
                    status: true
                  }
                }
              }
            }
          },
          omit: {
            poster_image: true,
            poster_mimetype: true,
            creation_date: true,
            last_updated: true,
            visible_researchers: true,
            visible_students: true,
            admin_creator_id: true,
            location_id: true,
            category_id: true
          }
        }
      },
      where: {
        user: {
          user_id: userId
        },
        activity: {
          event_date: {
            lt: new Date()
          }
        }
      },
      orderBy: {
        activity: {
          event_date: 'desc'
        }
      }
    })

    return activities.map((activity) => {
      return activity.activity
    })
  }

  async getUpcomingActivities (): Promise<ActivityInfo[]> {
    const activities = await prisma.activities.findMany({
      where: {
        event_date: {
          gte: new Date()
        }
      },
      select: {
        activity_id: true,
        title: true,
        description: true,
        event_date: true,
        register_date_limit: true,
        location: true,
        category: true,
        mandatory: true
      },
      orderBy: {
        event_date: 'asc'
      }
    })

    return activities
  }

  async getUpcomingActivitiesByRole (roleId: number): Promise<ActivityInfo[]> {
    const activities = await prisma.activities.findMany({
      where: {
        OR: [
          roleId === STUDENT_ROLE_ID ? { visible_students: true } : {},
          roleId === RESEARCHER_ROLE_ID ? { visible_researchers: true } : {}
        ],
        event_date: {
          gte: new Date()
        }
      },
      select: {
        activity_id: true,
        title: true,
        description: true,
        event_date: true,
        register_date_limit: true,
        location: true,
        category: true,
        mandatory: true
      },
      orderBy: {
        event_date: 'asc'
      }
    })

    return activities
  }

  async getActivityPoster (activityId: number): Promise<ActivityPoster> {
    const activityPoster = await prisma.activities.findFirst({
      where: {
        activity_id: activityId
      },
      select: {
        poster_image: true,
        poster_mimetype: true
      }
    })

    if (activityPoster === null) {
      throw new NotFoundError('No se encontró ninguna actividad con ese id')
    }

    if (activityPoster.poster_image === null) {
      throw new NotFoundError('Esta actividad no tiene un poster')
    }

    return activityPoster
  }

  async getActivitiesToReview (): Promise<UserAccesibleActivity[]> {
    const activities = await prisma.activities.findMany({
      where: {
        requirements: {
          some: {
            userDocuments: {
              some: {}
            }
          }
        }
      },
      include: {
        location: true,
        category: true
      },
      omit: {
        creation_date: true,
        last_updated: true,
        admin_creator_id: true,
        location_id: true,
        category_id: true,
        poster_image: true,
        poster_mimetype: true
      },
      orderBy: {
        event_date: 'asc'
      }
    })

    return activities
  }
}

export default new ActivityService()
