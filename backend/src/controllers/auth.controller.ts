import { Request, Response } from 'express'
import authService from '../services/auth.service'
import { AppError } from '../types/Error'
import { KEYPHRASE } from '../constants/env'
import jwt from '../lib/jwt'
import userService from '../services/user.service'
import { generateTokens } from '../utils/jwt'

class AuthController {
  login = async (req: Request, res: Response): Promise<undefined> => {
    try {
      const { institutionalEmail, password } = req.body

      if (institutionalEmail === undefined || password === undefined) {
        res.status(400).json({
          message: 'Error al iniciar sesión',
          error: 'Correo o contraseña no proporcionados'
        })
      }

      const response = await authService.login(institutionalEmail, password)

      res.status(200).json(response)
    } catch (error) {
      if (error instanceof AppError) {
        res.status(401).json({
          message: 'Error al iniciar sesión',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al iniciar sesión',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  addRefreshToken = async (req: Request, res: Response): Promise<undefined> => {
    try {
      const { refreshToken } = req.body

      if (refreshToken === undefined) {
        res.status(400).json({
          message: 'Error al crear un nuevo refresh token',
          error: 'No se proporcionó el refresh token'
        })
      }

      const savedRefreshToken = await authService.findRefreshToken(refreshToken)

      if (savedRefreshToken === null || savedRefreshToken.revoked) {
        res.status(401).json({
          message: 'Error al crear un nuevo refresh token',
          error: 'Acceso no autorizado'
        })
        return
      }

      if (KEYPHRASE === undefined) {
        res.status(400).json({
          message: 'Error al crear un nuevo refresh token',
          error: 'No se proporcionó la frase secreta para verificar el token'
        })
        return
      }

      const payload = jwt.verify(refreshToken, KEYPHRASE)

      if (typeof payload !== 'object' || payload === null || !('user_id' in payload)) {
        res.status(400).json({
          message: 'Error al crear un nuevo refresh token',
          error: 'Payload inválido'
        })
        return
      }

      const user = await userService.getUser(payload.user_id)

      if (user === null) {
        res.status(401).json({
          message: 'Error al crear un nuevo refresh token',
          error: 'Acceso no autorizado'
        })
        return
      }

      await authService.deleteRefreshToken(savedRefreshToken.id)

      const newTokens = generateTokens(user)

      await authService.addRefreshTokenToWhitelist(newTokens.refresh_token, user.user_id)

      res.status(200).json({ access_token: newTokens.access_token, refreshToken: newTokens.refresh_token })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error añadiendo refresh token',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error añadiendo refresh token',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  revokeTokens = async (req: Request, res: Response): Promise<undefined> => {
    try {
      const { userId } = req.body

      const result = await authService.revokeTokens(userId)

      res.status(200).json({ message: 'Tokens removidos correctamente', data: result })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error removiendo tokens',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error removiendo tokens',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }
}

export default new AuthController()
