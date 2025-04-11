import prisma from '../lib/prisma'
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
}

export default new RegistrationService()
