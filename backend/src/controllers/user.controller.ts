import { Request, Response } from 'express'
import userService from '../services/user.service'
import { isNumber } from '../utils/parsing'

class UserController {
  getUsers = async (_req: Request, res: Response): Promise<undefined> => {
    try {
      const response = await userService.getAllUsers()

      if (response.users.length === 0) {
        res.status(404).json({ message: 'No se encontró ningún usuario' })
      } else {
        res.status(200).json(response.users)
      }
    } catch (error) {
      res.status(500).json({
        message: 'Error al obtener usuarios',
        error: error instanceof Error ? error.message : 'Error desconocido'
      })
    }
  }

  getUser = async (req: Request, res: Response): Promise<undefined> => {
    try {
      const { id } = req.params

      if (!isNumber(id)) {
        res.status(400).json({ message: 'Id inválido' })
      }

      const response = await userService.getUser(Number(id))

      if (response.user === null) {
        res.status(404).json({ message: 'No se encontró ningún usuario con ese id' })
      } else {
        res.status(200).json(response)
      }
    } catch (error) {
      res.status(500).json({
        message: 'Error al obtener usuario',
        error: error instanceof Error ? error.message : 'Error desconocido'
      })
    }
  }

  createUser = async (req: Request, res: Response): Promise<undefined> => {
    try {
      const user = req.body

      const response = await userService.createUser(user)

      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({
        message: 'Error al crear el usuario',
        error: error instanceof Error ? error.message : 'Error desconocido'
      })
    }
  }
}

export default new UserController()
