import { Request, Response } from 'express'
import academicProgramService from '../services/academic-program.service'
import { AppError } from '../types/Error'
import { parseId } from '../utils/parsing/shared'
import { toNewAcademicProgram } from '../utils/parsing/AcademicProgram'

class AcademicProgramController {
  async getAcademicPrograms (req: Request, res: Response): Promise<void> {
    try {
      const { hasResearcher } = req.query

      let academicPrograms

      if (hasResearcher === 'true') {
        academicPrograms = await academicProgramService.getAcademicPrograms()
      } else {
        academicPrograms = await academicProgramService.getAcademicProgramsWithoutResearcher()
      }

      res.status(200).json({ academic_programs: academicPrograms })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al obtener los programas académicos',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al obtener los programas académicos',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  async createAcademicProgram (req: Request, res: Response): Promise<void> {
    try {
      const newAcademicProgramData = toNewAcademicProgram(req.body)

      const newAcademicProgram = await academicProgramService.createAcademicProgram(newAcademicProgramData)

      res.status(201).json({ academic_program: newAcademicProgram })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al crear el nuevo programa académico',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al crear el nuevo programa académico',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  async deleteAcademicProgram (req: Request, res: Response): Promise<void> {
    try {
      const academicProgramId = parseId(req.params.academicProgramId, 'No se proporcionó el id del programa académico o tiene un formato inválido')

      const academicProgramWasDeleted = await academicProgramService.deleteAcademicProgram(academicProgramId)

      if (academicProgramWasDeleted) {
        res.status(200).json({ message: 'El programa académico y todas las inscripciones de los usuarios fueron eliminados' })
      } else {
        res.status(400).json({
          message: 'Error al borrar el programa académico',
          error: 'No se pudo borrar el programa académico'
        })
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al borrar el programa académico',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al borrar el programa académico',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  async renameAcademicProgram (req: Request, res: Response): Promise<void> {
    try {
      const academicProgramId = parseId(req.params.academicProgramId, 'No se proporcionó el id del programa académico o tiene un formato inválido')

      const newName = req.body.name

      if (newName === undefined || newName === '') {
        res.status(400).json({
          message: 'Error al renombrar el programa académico',
          error: 'No se proporcionó el nombre del programa académico o está vacío'
        })
        return
      }

      const renamedAcademicProgram = await academicProgramService.renameAcademicProgram(academicProgramId, newName)

      res.status(200).json({ academic_program: renamedAcademicProgram })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al renombrar el programa académico',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al renombrar el programa académico',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  async assignResearcher (req: Request, res: Response): Promise<void> {
    try {
      const researcherId = parseId(req.body.researcher_id, 'El id del investigador no fue proporcionado o tiene un formato incorrecto')
      const academicProgramId = parseId(req.body.program_id, 'El id del programa académico no fue proporcionado o tiene un formato incorrecto')

      await academicProgramService.assignResearcher(academicProgramId, researcherId)

      res.status(200).json({ message: 'Se asignó al investigador correctamente ' })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al asignar al investigador al programa académico',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al asignar al investigador al programa académico',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }

  async unassignResearcher (req: Request, res: Response): Promise<void> {
    try {
      const academicProgramId = parseId(req.body.program_id, 'El id del programa académico no fue proporcionado o tiene un formato incorrecto')
      const researcherId = parseId(req.body.researcher_id, 'El id del programa académico no fue proporcionado o tiene un formato incorrecto')

      await academicProgramService.unassignResearcher(academicProgramId, researcherId)

      res.status(200).json({ message: 'Se quitó la asignación del investigador al programa académico' })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: 'Error al quitar la asignación al investigador al programa académico',
          error: error.message
        })
      } else {
        res.status(500).json({
          message: 'Error al quitar la asignación al investigador al programa académico',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }
  }
}

export default new AcademicProgramController()
