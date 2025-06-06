import { STUDENT_ROLE_ID } from '../constants/roles'
import prisma from '../lib/prisma'
import { ValidationError } from '../types/Error'
import userService from './user.service'

class InscriptionService {
  async deactivateStudentInscriptions (userId: number): Promise<void> {
    const user = await userService.getUser(userId)

    if (user.role.role_id !== STUDENT_ROLE_ID) {
      throw new ValidationError('El rol del usuario con el id proporcionado no es de estudiante')
    }

    await prisma.inscriptions.updateMany({
      where: {
        student_id: userId
      },
      data: {
        active: false
      }
    })
  }
}

export default new InscriptionService()
