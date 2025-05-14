import { Request, Response } from 'express'
import { toNewRequirement, toRequirementPatch, toRequirementUpdate } from '../utils/parsing/Requirement'
import requirementService from '../services/requirement.service'
import { AppError } from '../types/Error'
import { parseId } from '../utils/parsing/shared'

class RequirementController {
  getRequirement = async (req: Request, res: Response): Promise<void> => {
    try {
      const requirementId = parseId(req.params.requirementId, 'El id porporcionado del requisito es inválido')

      const requirement = await requirementService.getRequirement(requirementId)

      res.status(200).json({ requirement })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al obtener el requisito',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al obtener el requisito',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  createRequirement = async (req: Request, res: Response): Promise<void> => {
    try {
      const newRequirementData = toNewRequirement(req.body)

      const newRequirement = await requirementService.createRequirement(newRequirementData)

      res.status(201).json({ requirement: newRequirement })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al crear el nuevo requisito',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al crear el nuevo requisito',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  updateRequirement = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedRequirementData = toRequirementUpdate(req.body)
      const requirementId = parseId(req.params.requirementId, 'El id porporcionado del requisito es inválido')

      const updatedRequirement = await requirementService.updateRequirement(requirementId, updatedRequirementData)

      res.status(200).json({ requirement: updatedRequirement })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al actualizar el requisito',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al actualizar el requisito',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  patchRequirement = async (req: Request, res: Response): Promise<void> => {
    try {
      const patchRequirementData = toRequirementPatch(req.body)
      const requirementId = parseId(req.params.requirementId, 'El id porporcionado del requisito es inválido')

      const patchedRequirement = await requirementService.patchRequirement(requirementId, patchRequirementData)

      res.status(200).json({ requirement: patchedRequirement })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al actualizar el requisito',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al actualizar el requisito',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }
}

export default new RequirementController()
