import { Request, Response } from 'express'
import userService from '../services/user.service'
import { isNumber } from '../utils/parsing'
import { AppError } from '../types/Error'

class UserController {
  getUsers = async (_req: Request, res: Response): Promise<undefined> => {
    try {
      const response = await userService.getAllUsers()

      res.status(200).json(response.users)
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al obtener a los usuarios',
          error: error.message
        })
      } else {
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
          errror: 'El id proporcionado es inválido'
        })
      } else {
        const response = await userService.getUser(Number(id))

        res.status(200).json(response)
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

      const response = await userService.createUser(user)

      res.status(200).json(response)
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
        const response = await userService.updateUser(Number(id), userData)
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
}

export default new UserController()
