import { Registrations } from '../generated/client'
import prisma from '../lib/prisma'
import { NotFoundError, ValidationError } from '../types/Error'
import activityService from './activity.service'
import userService from './user.service'

class RegistrationService {
  async verifyRegistration (userId: number, activityId: number): Promise<boolean> {
    await userService.getUser(userId)

    await activityService.getActivity(activityId)

    const registration = await prisma.registrations.findFirst({
      where: {
        user_id: userId,
        activity_id: activityId
      }
    })

    return registration !== null
  }

  async getRegistration (userId: number, activityId: number): Promise<Registrations> {
    const registration = await prisma.registrations.findFirst({
      where: {
        user_id: userId,
        activity_id: activityId
      }
    })

    if (registration === null) {
      throw new NotFoundError('No existe ningún registro del usuario a ese evento o convocatoria')
    }

    return registration
  }

  async createRegistration (userId: number, activityId: number): Promise<Registrations> {
    await userService.getUser(userId)

    const alreadyRegistered = await this.verifyRegistration(userId, activityId)

    if (alreadyRegistered) {
      throw new ValidationError('El usuario ya está registrado en ese evento o convocatoria')
    }

    const registration = await prisma.registrations.create({
      data: {
        user_id: userId,
        activity_id: activityId
      }
    })

    return registration
  }

  async deleteRegistration (userId: number, activityId: number): Promise<boolean> {
    return await prisma.$transaction(async (prisma) => {
      const registration = await this.getRegistration(userId, activityId)

      await prisma.userDocuments.deleteMany({
        where: {
          registration_id: registration.registration_id
        }
      })

      await prisma.registrations.deleteMany({
        where: {
          user_id: userId,
          activity_id: activityId
        }
      })

      return true
    })
  }

  async registerUsersToActivity (roleIds: number[], activityId: number): Promise<boolean> {
    return await prisma.$transaction(async (prisma) => {
      const users = await prisma.users.findMany({
        where: {
          AND: [
            {
              role_id: {
                in: roleIds
              }
            },
            {
              NOT: {
                activities: {
                  some: {
                    activity_id: activityId
                  }
                }
              }
            }
          ]
        }
      })

      for (const user of users) {
        await this.createRegistration(user.user_id, activityId)
      }

      return true
    })
  }
}

export default new RegistrationService()
