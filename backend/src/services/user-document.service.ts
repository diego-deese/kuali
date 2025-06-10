import { PENDING_ID } from '../constants/revision-status'
import { UserDocuments } from '../generated/client'
import prisma from '../lib/prisma'
import { NotFoundError, ValidationError } from '../types/Error'
import { NewUserDocument, RequirementDocumentInfo, RequirementUserDocuments, UpdateUserDocument, UserDocumentInfo, UserUserDocuments } from '../types/UserDocuments'
import activityService from './activity.service'
import notificationService from './notification.service'
import registrationService from './registration.service'

class UserDocumentService {
  async getUserDocumentsByRequirement (activityId: number): Promise<RequirementUserDocuments[]> {
    await activityService.getActivity(activityId)

    const requirements = await prisma.requirements.findMany({
      where: {
        activity_id: activityId
      },
      include: {
        userDocuments: {
          include: {
            registration: {
              include: {
                user: {
                  select: {
                    user_id: true,
                    name: true,
                    second_name: true,
                    paternal_lastname: true,
                    maternal_lastname: true,
                    institutional_email: true,
                    identifier: true
                  }
                }
              }
            },
            status: true
          }
        }
      }
    })

    const groupedUserDocuments = requirements.map<RequirementUserDocuments>((req) => {
      return {
        requirement: {
          requirement_id: req.requirement_id,
          name: req.name,
          description: req.description
        },
        userDocuments: req.userDocuments.map<RequirementDocumentInfo>(doc => ({
          user_document_id: doc.user_document_id,
          status: {
            revision_status_id: doc.status.revision_status_id,
            name: doc.status.name
          },
          user: {
            user_id: doc.registration.user.user_id,
            name: doc.registration.user.name,
            second_name: doc.registration.user.second_name,
            paternal_lastname: doc.registration.user.paternal_lastname,
            maternal_lastname: doc.registration.user.maternal_lastname
          }
        }))
      }
    })

    return groupedUserDocuments
  }

  async getUserDocumentsByUser (activityId: number): Promise<UserUserDocuments[]> {
    await activityService.getActivity(activityId)

    const registrations = await prisma.registrations.findMany({
      where: {
        activity_id: activityId
      },
      include: {
        user: {
          select: {
            user_id: true,
            name: true,
            second_name: true,
            paternal_lastname: true,
            maternal_lastname: true,
            institutional_email: true,
            identifier: true
          }
        },
        userDocuments: {
          include: {
            requirement: true,
            status: true
          }
        }
      }
    })

    const groupedUserDocuments = registrations.map<UserUserDocuments>((reg) => {
      return {
        user: {
          user_id: reg.user.user_id,
          name: reg.user.name,
          second_name: reg.user.second_name,
          paternal_lastname: reg.user.paternal_lastname,
          maternal_lastname: reg.user.maternal_lastname
        },
        userDocuments: reg.userDocuments.map<UserDocumentInfo>(doc => ({
          user_document_id: doc.user_document_id,
          status: {
            revision_status_id: doc.status.revision_status_id,
            name: doc.status.name
          },
          requirement: {
            requirement_id: doc.requirement.requirement_id,
            name: doc.requirement.name,
            description: doc.requirement.description
          }
        }))
      }
    })

    return groupedUserDocuments
  }

  async getUserDocument (userDocumentId: number): Promise<UserDocuments> {
    const userDocument = await prisma.userDocuments.findFirst({
      where: {
        user_document_id: userDocumentId
      }
    })

    if (userDocument === null) {
      throw new NotFoundError('No se encontró ningún documento con ese id')
    }

    return userDocument
  }

  async updateUserDocumentStatus (userDocumentId: number, revisionStatusId: number): Promise<boolean> {
    try {
      const status = prisma.revisionStatus.findFirst({
        where: {
          revision_status_id: revisionStatusId
        }
      })

      if (status === null) {
        throw new ValidationError('No existe el estatus proporcionado en el sistema')
      }

      await this.getUserDocument(userDocumentId)

      const userDocument = await prisma.userDocuments.update({
        where: {
          user_document_id: userDocumentId
        },
        data: {
          revision_status_id: revisionStatusId,
          last_reviewed: new Date()
        }
      })

      await notificationService.createApprovedDocumentNotification(userDocument)

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async uploadUserDocument (activityId: number, userId: number, newUserDocumentData: NewUserDocument): Promise<UserDocuments> {
    const registration = await registrationService.getRegistration(userId, activityId)

    if (registration === null) {
      throw new NotFoundError('El usuario no está inscrito a esa actividad')
    }

    const newUserDocument = await prisma.userDocuments.create({
      data: {
        ...newUserDocumentData,
        registration_id: registration.registration_id,
        revision_status_id: PENDING_ID
      }
    })

    return newUserDocument
  }

  async updateUserDocument (userDocumentId: number, updateUserDocumentData: UpdateUserDocument): Promise<boolean> {
    try {
      await this.getUserDocument(userDocumentId)

      await prisma.userDocuments.update({
        data: {
          ...updateUserDocumentData,
          last_updated: new Date()
        },
        where: {
          user_document_id: userDocumentId
        }
      })

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async deleteUserDocument (userDocumentId: number): Promise<boolean> {
    try {
      await this.getUserDocument(userDocumentId)

      await prisma.userDocuments.delete({
        where: {
          user_document_id: userDocumentId
        }
      })

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}

export default new UserDocumentService()
