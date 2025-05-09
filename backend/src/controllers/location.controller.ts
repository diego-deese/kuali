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

  async createLocation (req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body

      if (name === undefined) {
        res.status(400).json({
          message: 'Error al crear un nuevo lugar',
          error: 'No se proporcionó el nombre del lugar'
        })
        return
      }

      if (name === '') {
        res.status(400).json({
          message: 'Error al crear un nuevo lugar',
          error: 'El nombre del lugar no puede estar vacío'
        })
      }

      const location = await locationService.createLocation(String(name).trim())

      res.status(200).json({ location })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al crear un nuevo lugar',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al crear un nuevo lugar',
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

      if (name === '') {
        res.status(400).json({
          message: 'Error al editar el nombre del lugar',
          error: 'El nuevo nombre del lugar no puede estar vacío'
        })
        return
      }

      const location = await locationService.renameLocation(Number(locationId), String(name).trim())

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

  async deleteLocation (req: Request, res: Response): Promise<void> {
    try {
      const { locationId } = req.params

      if (!isNumber(locationId)) {
        res.status(400).json({
          message: 'Error al tratar de eliminar el lugar',
          error: 'El id proporcionado es inválido'
        })
        return
      }

      const response = await locationService.deleteLocation(Number(locationId))

      res.status(200).json(response)
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al tratar de eliminar el lugar',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al tratar de eliminar el lugar',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }
}

export default new LocationController()
