import { NewActivity } from '../../types/Activities'
import { ValidationError } from '../../types/Error'
import { ActivityRequirement } from '../../types/Requirement'
import { isDate, isString } from '../validations'
import { toActivityRequirement } from './Requirement'
import { parseBoolean, parseId } from './shared'

const parseTitle = (titleFromRequest: string): string => {
  if (!isString(titleFromRequest) || titleFromRequest === '') {
    throw new ValidationError('El formato del titulo del evento o convocatoria es inválido')
  }

  if (titleFromRequest.length > 255) {
    throw new ValidationError('El titulo es demasiado largo')
  }

  return titleFromRequest
}

const parseDescription = (descriptionFromRequest: string): string => {
  if (!isString(descriptionFromRequest) || descriptionFromRequest === '') {
    throw new ValidationError('El formato de la descripción del evento o convocatoria es inválido')
  }

  return descriptionFromRequest
}

const parseEventDate = (dateFromRequest: any): Date => {
  if (!isString(dateFromRequest) || !isDate(dateFromRequest)) {
    throw new ValidationError('El formato de la fecha del evento o convocatoria es inválido')
  }

  return new Date(dateFromRequest)
}

const parseRegisterDate = (dateFromRequest: any): Date => {
  if (!isString(dateFromRequest) || !isDate(dateFromRequest)) {
    throw new ValidationError('El formato de la fecha límite de registro del evento o convocatoria es inválido')
  }

  return new Date(dateFromRequest)
}

const parseRequirements = (requirementsFromRequest: any[]): ActivityRequirement[] => {
  if (!Array.isArray(requirementsFromRequest)) {
    throw new ValidationError('Los requisitos deben ser proporcionados dentro de un array')
  }

  return requirementsFromRequest.map<ActivityRequirement>(req => toActivityRequirement(req))
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

export const toNewActivity = (object: any): NewActivity => {
  const newActivity: NewActivity = {
    title: parseTitle(object.title),
    description: parseDescription(object.description),
    event_date: parseEventDate(object.event_date),
    register_date_limit: parseRegisterDate(object.register_date_limit),
    mandatory: parseBoolean(object.mandatory, 'El formato del atributo obligatorio del evento o convocatoria es inválido'),
    visible_researchers: parseBoolean(object.visible_researchers, 'El fromato del atributo visible para investigadores del evento o convocatoria es inválido'),
    visible_students: parseBoolean(object.visible_students, 'El formato del atributo visible para estudiantes del evento o convocatoria es inválido'),
    admin_creator_id: parseId(object.admin_creator_id, 'El formato del id del administrador creador del evento o convocatoria es inválido'),
    location_id: parseId(object.location_id, 'El formato de la id del lugar del evento o convocatoria es inválido'),
    category_id: parseId(object.category_id, 'El formato del id de la categoría del evento o convocatoria es inválido'),
    requirements: object.requirements !== undefined ? parseRequirements(object.requirements) : [],
    poster_image: parseFileContent(object.poster_image),
    poster_mimetype: parseMimeType(object.poster_mimetype)
  }

  return newActivity
}

export const toUpdateActivity = (object: any): UpdateActivity => {
  const updateActivity: UpdateActivity = {
    title: object.title !== undefined ? parseTitle(object.title) : undefined,
    description: object.description !== undefined ? parseDescription(object.description) : undefined,
    event_date: object.event_date !== undefined ? parseEventDate(object.event_date) : undefined,
    register_date_limit: object.register_date_limit !== undefined ? parseRegisterDate(object.register_date_limit) : undefined,
    mandatory: object.mandatory !== undefined ? parseBoolean(object.mandatory, 'El formato del atributo obligatorio del evento o convocatoria es inválido') : undefined,
    visible_researchers: object.visible_researchers !== undefined ? parseBoolean(object.visible_researchers, 'El fromato del atributo visible para investigadores del evento o convocatoria es inválido') : undefined,
    visible_students: object.visible_students !== undefined ? parseBoolean(object.visible_students, 'El formato del atributo visible para estudiantes del evento o convocatoria es inválido') : undefined,
    location_id: object.location_id !== undefined ? parseId(object.location_id, 'El formato de la id del lugar del evento o convocatoria es inválido') : undefined,
    category_id: object.category_id !== undefined ? parseId(object.category_id, 'El formato del id de la categoría del evento o convocatoria es inválido') : undefined,
    poster_image: object.poster_image !== undefined ? parseFileContent(object.poster_image) : undefined,
    poster_mimetype: object.poster_mimetype !== undefined ? parseMimeType(object.poster_mimetype) : undefined
  }

  return updateActivity
}
