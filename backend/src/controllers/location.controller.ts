import { Request, Response } from 'express'
import locationService from '../services/location.service'
import { AppError } from '../types/Error'
import { isNumber } from '../utils/parsing'

class LocationController {
  async getLocations (_req: Request, res: Response): Promise<void> {
    try {
      const locations = await locationService.getAllLocations()

      res.status(200).json({ locations })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al obtener los lugares',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al obtener los lugares',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  async renameLocation (req: Request, res: Response): Promise<void> {
    try {
      const { locationId } = req.params
      const { name } = req.body

      if (!isNumber(locationId)) {
        res.status(400).json({
          message: 'Error al editar el nombre del lugar',
          error: 'El id proporcionado es inválido'
        })
        return
      }

      if (name === undefined) {
        res.status(400).json({
          message: 'Error al editar el nombre del lugar',
          error: 'No se proporcionó el nuevo nombre'
        })
        return
      }

      const location = await locationService.renameLocation(Number(locationId), name)

      res.status(200).json({ location })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al editar el nombre del lugar',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al editar el nombre del lugar',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }
}

export default new LocationController()
