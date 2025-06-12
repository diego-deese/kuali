import { ValidationError } from '../../types/Error'
import { NewUser, OptionalUpdatedUser } from '../../types/Users'
import { isString } from '../validations'

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

export const toNewUser = (object: any): NewUser => {
  console.log('parsing user')
  if (!isString(object.name) || object.name.trim() === '') {
    throw new ValidationError('El nombre no puede estar vacío')
  }

  const roleId = Number(object.role_id)
  if (isNaN(roleId)) {
    throw new ValidationError('El rol es inválido')
  }
  return {
    name: object.name,
    second_name: object.second_name,
    paternal_lastname: object.paternal_lastname,
    maternal_lastname: object.maternal_lastname,
    institutional_email: object.institutional_email,
    personal_email: object.personal_email,
    curp: object.curp,
    profile_photo: object.profile_photo,
    photo_mime_type: parseMimeType(object.photo_mime_type),
    identifier: object.identifier,
    password: object.password,
    role_id: roleId,
    categoriaProfr: object.categoriaProfr ?? null,
    cvuNumber: object.cvuNumber ?? null,
    employeeNumber: object.employeeNumber ?? null,
    namingNumber: object.namingNumber ?? null,
    namingType: object.namingType ?? null,
    placementType: object.placementType ?? null,
    researchLine: object.researchLine ?? null,
    sniDistinction: object.sniDistinction ?? null,
    socialSecurityNumber: object.socialSecurityNumber ?? null,
    validity: object.validity ?? null,
    ediLevel: object.ediLevel ?? null
  }
}

export const toUpdateUser = (object: any): OptionalUpdatedUser => {
  const updateUser: OptionalUpdatedUser = {
    name: object.name,
    second_name: object.second_name,
    paternal_lastname: object.paternal_lastname,
    maternal_lastname: object.maternal_lastname,
    institutional_email: object.institutional_email,
    personal_email: object.personal_email,
    curp: object.curp,
    identifier: object.identifier,
    categoriaProfr: object.categoriaProfr ?? null,
    cvuNumber: object.cvuNumber ?? null,
    employeeNumber: object.employeeNumber ?? null,
    namingNumber: object.namingNumber ?? null,
    namingType: object.namingType ?? null,
    placementType: object.placementType ?? null,
    researchLine: object.researchLine ?? null,
    sniDistinction: object.sniDistinction ?? null,
    socialSecurityNumber: object.socialSecurityNumber ?? null,
    validity: object.validity ?? null,
    ediLevel: object.ediLevel ?? null
  }

  if (object.profile_photo !== undefined && object.profile_photo !== null) {
    updateUser.profile_photo = object.profile_photo
  }

  if (object.photo_mime_type !== undefined && object.photo_mime_type !== null) {
    updateUser.photo_mime_type = parseMimeType(object.photo_mime_type)
  }

  return updateUser
}
