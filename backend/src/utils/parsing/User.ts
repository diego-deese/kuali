import { ValidationError } from '../../types/Error'
import { NewUser, OptionalUpdatedUser } from '../../types/Users'
import { hashPassword } from '../encryption'
import { isString, isDate } from '../validations'

const parseMimeType = (mimetype: string): string => {
  if (!isString(mimetype) || mimetype.trim() === '') {
    throw new ValidationError('El mimetype del archivo es inválido')
  }

  const mimeRegex = /^[a-zA-Z0-9!#$&^_.+-]+\/[a-zA-Z0-9!#$&^_.+-]+$/
  if (!mimeRegex.test(mimetype)) {
    throw new ValidationError('El mimetype del archivo no es válido')
  }

  return mimetype
}

const parseName = (nameFromRequest: string): string => {
  if (!isString(nameFromRequest) || nameFromRequest.trim() === '') {
    throw new ValidationError('El nombre no puede estar vacío')
  }

  if (nameFromRequest.length > 255) {
    throw new ValidationError('El nombre es demasiado largo')
  }

  return nameFromRequest
}

const parseSecondName = (secondNameFromRequest: string | undefined | null): string | null => {
  if (secondNameFromRequest === undefined || secondNameFromRequest === null) {
    return null
  }

  if (!isString(secondNameFromRequest)) {
    throw new ValidationError('El formato del segundo nombre es inválido')
  }

  if (secondNameFromRequest.length > 255) {
    throw new ValidationError('El segundo nombre es demasiado largo')
  }

  return secondNameFromRequest
}

const parseLastName = (lastNameFromRequest: string): string => {
  if (!isString(lastNameFromRequest) || lastNameFromRequest.trim() === '') {
    throw new ValidationError('El apellido no puede estar vacío')
  }

  if (lastNameFromRequest.length > 255) {
    throw new ValidationError('El apellido es demasiado largo')
  }

  return lastNameFromRequest
}

const parseEmail = (emailFromRequest: string): string => {
  if (!isString(emailFromRequest) || emailFromRequest.trim() === '') {
    throw new ValidationError('El correo electrónico no puede estar vacío')
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(emailFromRequest)) {
    throw new ValidationError('El formato del correo electrónico es inválido')
  }

  if (emailFromRequest.length > 255) {
    throw new ValidationError('El correo electrónico es demasiado largo')
  }

  return emailFromRequest
}

const parseCURP = (curpFromRequest: string | undefined | null): string | null => {
  if (curpFromRequest === undefined || curpFromRequest === null) {
    return null
  }

  if (!isString(curpFromRequest)) {
    throw new ValidationError('El formato del CURP es inválido')
  }

  const curpRegex = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z][0-9]$/
  if (!curpRegex.test(curpFromRequest)) {
    throw new ValidationError('El formato del CURP es inválido')
  }

  return curpFromRequest
}

const parseIdentifier = (identifierFromRequest: string): string => {
  if (!isString(identifierFromRequest) || identifierFromRequest.trim() === '') {
    throw new ValidationError('El identificador no puede estar vacío')
  }

  if (identifierFromRequest.length > 255) {
    throw new ValidationError('El identificador es demasiado largo')
  }

  return identifierFromRequest
}

const parseEmployeeNumber = (employeeNumberFromRequest: string | undefined | null): string | null => {
  if (employeeNumberFromRequest === undefined || employeeNumberFromRequest === null) {
    return null
  }

  if (!isString(employeeNumberFromRequest)) {
    throw new ValidationError('El formato del número de empleado es inválido')
  }

  if (employeeNumberFromRequest.length > 8) {
    throw new ValidationError('El número de empleado es demasiado largo')
  }

  return employeeNumberFromRequest
}

const parseCategoriaProfr = (categoriaFromRequest: string | undefined | null): string | null => {
  if (categoriaFromRequest === undefined || categoriaFromRequest === null) {
    return null
  }

  if (!isString(categoriaFromRequest)) {
    throw new ValidationError('El formato de la categoría del profesor es inválido')
  }

  if (categoriaFromRequest.length > 20) {
    throw new ValidationError('La categoría del profesor es demasiado larga')
  }

  return categoriaFromRequest
}

const parseSNIDistinction = (sniFromRequest: string | undefined | null): string | null => {
  if (sniFromRequest === undefined || sniFromRequest === null) {
    return null
  }

  if (!isString(sniFromRequest)) {
    throw new ValidationError('El formato de la distinción SNI es inválido')
  }

  if (sniFromRequest.length > 20) {
    throw new ValidationError('La distinción SNI es demasiado larga')
  }

  return sniFromRequest
}

const parseEDILevel = (ediFromRequest: number | undefined | null): number | null => {
  if (ediFromRequest === undefined || ediFromRequest === null) {
    return null
  }

  if (isNaN(Number(ediFromRequest))) {
    throw new ValidationError('El formato del nivel EDI es inválido')
  }

  return Number(ediFromRequest)
}

const parseValidityDate = (dateFromRequest: any): Date => {
  if (!isString(dateFromRequest) || !isDate(dateFromRequest)) {
    throw new ValidationError('El formato de la fecha de vigencia es inválido')
  }

  return new Date(dateFromRequest)
}

export const toNewUser = (object: any): NewUser => {
  const roleId = Number(object.role_id)
  if (isNaN(roleId)) {
    throw new ValidationError('El rol es inválido')
  }

  return {
    name: parseName(object.name),
    second_name: parseSecondName(object.second_name),
    paternal_lastname: parseLastName(object.paternal_lastname),
    maternal_lastname: parseLastName(object.maternal_lastname),
    institutional_email: parseEmail(object.institutional_email),
    personal_email: parseEmail(object.personal_email),
    curp: parseCURP(object.curp),
    profile_photo: object.profile_photo,
    photo_mime_type: parseMimeType(object.photo_mime_type),
    identifier: parseIdentifier(object.identifier),
    password: object.password,
    role_id: roleId,
    categoriaProfr: parseCategoriaProfr(object.categoriaProfr),
    cvuNumber: object.cvuNumber,
    employeeNumber: parseEmployeeNumber(object.employeeNumber),
    namingNumber: object.namingNumber,
    namingType: object.namingType,
    placementType: object.placementType,
    researchLine: object.researchLine,
    sniDistinction: parseSNIDistinction(object.sniDistinction),
    socialSecurityNumber: object.socialSecurityNumber,
    validity: parseValidityDate(object.validity),
    ediLevel: parseEDILevel(object.ediLevel)
  }
}

export const toUpdateUser = async (object: any): Promise<OptionalUpdatedUser> => {
  const updateUser: OptionalUpdatedUser = {
    name: object.name !== undefined ? parseName(object.name) : undefined,
    second_name: object.second_name !== undefined ? parseSecondName(object.second_name) : undefined,
    paternal_lastname: object.paternal_lastname !== undefined ? parseLastName(object.paternal_lastname) : undefined,
    maternal_lastname: object.maternal_lastname !== undefined ? parseLastName(object.maternal_lastname) : undefined,
    institutional_email: object.institutional_email !== undefined ? parseEmail(object.institutional_email) : undefined,
    personal_email: object.personal_email !== undefined ? parseEmail(object.personal_email) : undefined,
    password: object.password !== undefined ? await hashPassword(object.password) : undefined,
    curp: object.curp !== undefined ? parseCURP(object.curp) : undefined,
    identifier: object.identifier !== undefined ? parseIdentifier(object.identifier) : undefined,
    categoriaProfr: object.categoriaProfr !== undefined ? parseCategoriaProfr(object.categoriaProfr) : null,
    cvuNumber: object.cvuNumber !== undefined ? object.cvuNumber : null,
    employeeNumber: object.employeeNumber !== undefined ? parseEmployeeNumber(object.employeeNumber) : null,
    namingNumber: object.namingNumber !== undefined ? object.namingNumber : null,
    namingType: object.namingType !== undefined ? object.namingType : null,
    placementType: object.placementType !== undefined ? object.placementType : null,
    researchLine: object.researchLine !== undefined ? object.researchLine : null,
    sniDistinction: object.sniDistinction !== undefined ? parseSNIDistinction(object.sniDistinction) : null,
    socialSecurityNumber: object.socialSecurityNumber !== undefined ? object.socialSecurityNumber : null,
    validity: object.validity !== undefined && object.validity !== null ? parseValidityDate(object.validity) : null,
    ediLevel: object.ediLevel !== undefined ? parseEDILevel(object.ediLevel) : null
  }

  if (object.profile_photo !== undefined && object.profile_photo !== null) {
    updateUser.profile_photo = object.profile_photo
  }

  if (object.photo_mime_type !== undefined && object.photo_mime_type !== null) {
    updateUser.photo_mime_type = parseMimeType(object.photo_mime_type)
  }

  return updateUser
}
