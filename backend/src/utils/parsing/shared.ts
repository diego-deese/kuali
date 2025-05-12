import { ValidationError } from '../../types/Error'
import { isBoolean, isNumber } from '../validations'

export const parseBoolean = (booleanFromRequest: any, errorMsg: string): boolean => {
  if (!isBoolean(booleanFromRequest)) {
    throw new ValidationError(errorMsg)
  }

  if (booleanFromRequest === true || booleanFromRequest === 'true') return true
  if (booleanFromRequest === false || booleanFromRequest === 'false') return false

  return Boolean(booleanFromRequest)
}

export const parseId = (idFromRequest: any, errorMsg: string): number => {
  if (!isNumber(idFromRequest)) {
    throw new ValidationError(errorMsg)
  }

  return +idFromRequest
}
