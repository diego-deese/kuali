import { Request, Response } from 'express'
import userService from '../services/user.service'
import { isNumber } from '../utils/validations'
import { AppError } from '../types/Error'
import { AuthRequest } from '../types/Request'
import { parseId } from '../utils/parsing/shared'
// import { AuthRequest } from '../types/Request'

class UserController {
  getUsers = async (_req: Request, res: Response): Promise<undefined> => {
    try {
      const users = await userService.getAllUsers()

      res.status(200).json({ users })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al obtener a los usuarios',
          error: error.message
        })
      } else {
        console.log('Error en getUsers')
        res.status(500).json({
          message: 'Error al obtener a los usuarios',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  getUser = async (req: Request, res: Response): Promise<undefined> => {
    try {
      const { id } = req.params

      if (!isNumber(id)) {
        res.status(400).json({
          message: 'Error al obtener el usuario',
          error: 'El id proporcionado es inválido'
        })
      } else {
        const user = await userService.getUser(Number(id))

        res.status(200).json({ user })
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al obtener al usuario',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al obtener al usuario',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  createUser = async (req: Request, res: Response): Promise<undefined> => {
    try {
      const user = req.body
      console.log(user)

      const createdUser = await userService.createUser(user)

      res.status(200).json({ user: createdUser })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al crear al usuario',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al crear al usuario',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  updateUser = async (req: Request, res: Response): Promise<undefined> => {
    try {
      const { id } = req.params
      const userData = req.body

      if (!isNumber(id)) {
        res.status(400).json({
          message: 'Error al actualizar el usuario',
          errror: 'El id proporcionado es inválido'
        })
      } else {
        const updatedUser = await userService.updateUser(Number(id), userData)
        res.status(200).json({ user: updatedUser })
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al actualizar el usuario',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al actualizar el usuario',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  deleteUser = async (req: Request, res: Response): Promise<undefined> => {
    try {
      const { id } = req.params

      if (!isNumber(id)) {
        res.status(400).json({
          message: 'Error al borrar el usuario',
          errror: 'El id proporcionado es inválido'
        })
      } else {
        const response = await userService.deleteUser(Number(id))

        res.status(200).json(response)
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al actualizar el usuario',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al actualizar el usuario',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  updatePasswordWithValidation = async (req: Request, res: Response): Promise<undefined> => {
    try {
      const { id } = req.params
      const { actualPassword, newPassword } = req.body

      if (!isNumber(id)) {
        res.status(400).json({
          message: 'Error al actualizar la contraseña del usuario',
          errror: 'El id proporcionado es inválido'
        })
      } else {
        const response = await userService.updatePasswordWithValidation(Number(id), actualPassword, newPassword)

        res.status(200).json(response)
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al actualizar la contraseña del usuario',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al actualizar la contraseña del usuario',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  getUserProfilePhoto = async (req: Request, res: Response): Promise<undefined> => {
    try {
      const { id } = req.params

      if (!isNumber(id)) {
        res.status(400).json({
          message: 'Error obtener la foto de perfil del usuario',
          errror: 'El id proporcionado es inválido'
        })
      } else {
        const userProfilePhotoInfo = await userService.getUserProfilePhoto(Number(id))

        if (userProfilePhotoInfo.profile_photo !== null) {
          const imageBuffer = Buffer.isBuffer(userProfilePhotoInfo.profile_photo)
            ? userProfilePhotoInfo.profile_photo
            : Buffer.from(userProfilePhotoInfo.profile_photo)

          res.setHeader('Content-type', userProfilePhotoInfo.photo_mime_type ?? 'image/jpg')
          res.setHeader('Content-Length', imageBuffer.length)

          res.end(imageBuffer)
        } else {
          res.status(404).json({
            message: 'El usuario no tiene foto de perfil'
          })
        }
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error obtener la foto de perfil del usuario',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error obtener la foto de perfil del usuario',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  getResearcherStudentsWithAcademicProgram = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (req.user === undefined) {
        res.status(403).json({
          message: 'Error al obtener los estudiantes del investigador',
          error: 'Usuario no autenticado'
        })
        return
      }

      const researcherId = req.user.user_id

      if (!isNumber(researcherId)) {
        res.status(400).json({
          message: 'Error al obtener los estudiantes del investigador',
          error: 'El id proporcionado en el token es inválido'
        })
        return
      }

      const studentsWithPrograms = await userService.getResearcherStudentsWithAcademicProgram(+researcherId)

      res.status(200).json({ studentsByAcademicProgram: studentsWithPrograms })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al obtener los estudiantes del investigador',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al obtener los estudiantes del investigador',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  async deactivateUser (req: Request, res: Response): Promise<void> {
    try {
      const userId = parseId(req.params.id, 'El id del usuario no fue proporcionado o su formato es inválido')

      await userService.deactivateUser(userId)

      res.status(200).json({ message: 'El usuario fue desactivado con éxito' })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al desactivar al usuario',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al desactivar al usuario',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  assignStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      const studentId = parseId(req.body.student_id, 'El id del estudiante no fue proporcionado o tiene un formato incorrecto')
      const academicProgramId = parseId(req.body.program_id, 'El id del programa académico no fue proporcionado o tiene un formato incorrecto')

      await userService.assignStudent(academicProgramId, studentId)
      res.status(200).json({ message: 'Se registró la inscripción correctamente' })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al crear la inscripción',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al crear la inscripción',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  deleteAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params

      await userService.deleteAdmin(Number(id))

      res.status(200).json({ message: 'Se eliminó la cuenta del administrador permanentemente' })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al eliminar al usuario administrador',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al eliminar al usuario administrador',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }
}

export default new UserController()
