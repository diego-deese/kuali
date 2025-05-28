import { ValidationError } from '../../types/Error'
import { ActivityRequirement, NewRequirement, UpdateRequirement } from '../../types/Requirement'
import { isString } from '../validations'
import { toNewActivityRequirementTemplate } from './RequirementTemplate'
import { parseId } from './shared'

const parseName = (nameFromRequest: string): string => {
  if (!isString(nameFromRequest)) {
    throw new ValidationError('El formato del nombre proporcionado es inválido')
  }

  if (nameFromRequest === '') {
    throw new ValidationError('El nombre del requisito no puede estar vacío')
  }

  if (nameFromRequest.length > 100) {
    throw new ValidationError('El nombre del requisito es demasiado largo')
  }

  return nameFromRequest
}

const parseDescription = (descriptionFromRequest: string): string => {
  if (!isString(descriptionFromRequest)) {
    throw new ValidationError('El formato de la descripción proporcionada es inválido')
  }

  if (descriptionFromRequest === '') {
    throw new ValidationError('La descripción del requisito no puede estar vacía')
  }

  if (descriptionFromRequest.length > 100) {
    throw new ValidationError('La descripción del requisito es demasiado larga')
  }

  return descriptionFromRequest
}

export const toNewRequirement = (object: any): NewRequirement => {
  const newRequirement: NewRequirement = {
    name: parseName(object.name),
    description: parseDescription(object.description),
    activity_id: parseId(object.activity_id, 'El id proporcionado de la actividad es inválido')
  }

  return newRequirement
}

export const toRequirementUpdate = (object: any): UpdateRequirement => {
  const updatedRequirement: UpdateRequirement = {
    name: object.name !== undefined ? parseName(object.name) : undefined,
    description: object.description !== undefined ? parseDescription(object.description) : undefined
  }

  return updatedRequirement
}

export const toActivityRequirement = (object: any): ActivityRequirement => {
  const activityRequirement: ActivityRequirement = {
    name: parseName(object.name),
    description: parseDescription(object.description),
    template: object.template === null || object.template === undefined ? null : toNewActivityRequirementTemplate(object.template)
  }

  return activityRequirement
}

export const toUpdateRequirement = (object: any): UpdateRequirement => {
  const updateActivityRequirement: UpdateRequirement = {
    name: object.name !== undefined ? parseName(object.name) : undefined,
    description: object.description !== undefined ? parseDescription(object.description) : undefined
  }

  return updateActivityRequirement
}
