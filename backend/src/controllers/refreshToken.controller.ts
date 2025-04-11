import { Request, Response } from 'express'
import refreshTokenService from '../services/refreshToken.service'
import { AppError } from '../types/Error'

class RefreshTokenController {
  addRefreshToken = async (req: Request, res: Response): Promise<undefined> => {
    try {
      const { refreshToken, userId } = req.body

      const result = await refreshTokenService.addRefreshTokenToWhitelist({ refreshToken, userId })

      res.status(200).json({ message: 'Refresh token creado exitosamente', data: result })
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

  findRefreshToken = async (req: Request, res: Response): Promise<undefined> => {
    try {
      const { refreshToken } = req.body

      const storedToken = await refreshTokenService.findRefreshToken(refreshToken)
      if (storedToken !== null) {
        res.status(200).json({ message: 'Refresh token no encontrado', data: storedToken })
      } else {
        res.status(400).json({ message: 'Refresh token invalido' })
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Refresh token no encontrado',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Refresh token no encontrado',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  revokeTokens = async (req: Request, res: Response): Promise<undefined> => {
    try {
      const { userId } = req.body

      const result = await refreshTokenService.revokeTokens(userId)

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

export default new RefreshTokenController()
