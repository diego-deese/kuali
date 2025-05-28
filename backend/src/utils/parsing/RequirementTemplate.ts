import { ValidationError } from '../../types/Error'
import { NewActivityRequirementTemplate, NewRequirementTemplate } from '../../types/RequirementTemplates'
import { isString } from '../validations'
import { parseId } from './shared'

const parseFileName = (fileNameFromRequest: string): string => {
  if (!isString(fileNameFromRequest)) {
    throw new ValidationError('El formato del nombre del archivo es inválido')
  }

  if (fileNameFromRequest === '') {
    throw new ValidationError('El nombre del archivo no puede estar vacío')
  }

  // Permite letras, números, espacios, guiones, guiones bajos y puntos, pero no permite caracteres reservados de Windows
  const fileNameRegex = /^[^\\/:*?"<>|]+$/

  if (!fileNameRegex.test(fileNameFromRequest)) {
    throw new ValidationError('El nombre del archivo contiene caracteres no permitidos')
  }

  return fileNameFromRequest
}

const parseMimeType = (mimetypeFromRequest: string): string => {
  if (!isString(mimetypeFromRequest)) {
    throw new ValidationError('El formato del mimetype del archivo es inválido')
  }

  if (mimetypeFromRequest === '') {
    throw new ValidationError('El mimetype del archivo no puede estar vacío')
  }

  const mimeTypeRegex = /^[a-zA-Z0-9!#$&^_.+-]+\/[a-zA-Z0-9!#$&^_.+-]+$/

  if (!mimeTypeRegex.test(mimetypeFromRequest)) {
    throw new ValidationError('El mimetype del archivo no es válido')
  }

  return mimetypeFromRequest
}

const parseFileContent = (fileContentFromRequest: Uint8Array<ArrayBufferLike>): Uint8Array<ArrayBufferLike> => {
  if (fileContentFromRequest.length === 0) {
    throw new ValidationError('El contenido del archivo está vacío')
  }

  return fileContentFromRequest
}

export const toNewRequirementTemplate = (object: any): NewRequirementTemplate => {
  const newRequirementTemplate: NewRequirementTemplate = {
    name: parseFileName(object.name),
    file_content: parseFileContent(object.file_content),
    mimetype: parseMimeType(object.mimetype),
    requirement_id: parseId(object.requirement_id, 'El id proporcionado del requisito es inválido')
  }

  return newRequirementTemplate
}

export const toNewActivityRequirementTemplate = (object: any): NewActivityRequirementTemplate => {
  const newRequirementTemplate: NewActivityRequirementTemplate = {
    name: parseFileName(object.name),
    file_content: parseFileContent(object.file_content),
    mimetype: parseMimeType(object.mimetype)
  }

  return newRequirementTemplate
}
