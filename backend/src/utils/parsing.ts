import { NewActivity } from '../types/Activities'
import { ValidationError } from '../types/Error'
import { isBoolean, isDate, isNumber, isString } from './validations'

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

const parseBoolean = (booleanFromRequest: any, errorMsg: string): boolean => {
  if (!isBoolean(booleanFromRequest)) {
    throw new ValidationError(errorMsg)
  }

  if (booleanFromRequest === true || booleanFromRequest === 'true') return true
  if (booleanFromRequest === false || booleanFromRequest === 'false') return false

  return Boolean(booleanFromRequest)
}

const parseId = (idFromRequest: any, errorMsg: string): number => {
  if (!isNumber(idFromRequest)) {
    throw new ValidationError(errorMsg)
  }

  return +idFromRequest
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
    category_id: parseId(object.category_id, 'El formato del id de la categoría del evento o convocatoria es inválido')
  }

  return newActivity
}
