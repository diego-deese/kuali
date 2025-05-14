import { Registrations } from '../generated/client'
import prisma from '../lib/prisma'
import { NotFoundError } from '../types/Error'
import activityService from './activity.service'
import userService from './user.service'

class RegistrationService {
  async verifyRegistration (userId: number, activityId: number): Promise<Boolean> {
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
}

export default new RegistrationService()
