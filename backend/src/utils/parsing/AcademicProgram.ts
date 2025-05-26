import { NewAcademicProgram } from '../../types/AcademicProgram'
import { ValidationError } from '../../types/Error'
import { isString } from '../validations'
import { parseId } from './shared'

const parseName = (nameFromRequest: string): string => {
  if (!isString(nameFromRequest)) {
    throw new ValidationError('El formato del nombre proporcionado es inválido')
  }

  if (nameFromRequest === '') {
    throw new ValidationError('El nombre del programa académico no puede estar vacío')
  }

  if (nameFromRequest.length > 255) {
    throw new ValidationError('El nombre del requisito es demasiado largo')
  }

  return nameFromRequest
}

export const toNewAcademicProgram = (object: any): NewAcademicProgram => {
  const newAcademicProgram: NewAcademicProgram = {
    name: parseName(object.name),
    researcher_id: object.researcher_id !== undefined
      ? parseId(object.researcher_id, 'El formato de la id del investigador es inválido')
      : null
  }

  return newAcademicProgram
}
