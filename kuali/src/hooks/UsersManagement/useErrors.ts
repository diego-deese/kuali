import { useState } from 'react'
import { UserFormErrors, InputError } from '../../types/Error'

export const useErrors = (mode: string) => {
  const [errors, setErrors] = useState<UserFormErrors>({
    name: { error: false, errorMessage: '' },
    secondName: { error: false, errorMessage: '' },
    paternalLastName: { error: false, errorMessage: '' },
    maternalLastName: { error: false, errorMessage: '' },
    email: { error: false, errorMessage: '' },
    password: { error: false, errorMessage: '' },
    identifier: { error: false, errorMessage: '' },
    curp: { error: false, errorMessage: '' },
    role: { error: false, errorMessage: '' },
  })

  const updateErrors = (newErrors: Partial<UserFormErrors>) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...newErrors,
    }))
  }

  const validateName = (name: string): InputError => {
    if (!name || name.trim() === '') {
      return { error: true, errorMessage: 'El nombre del usuario es requerido' }
    }
    const letterRegex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]+$/
    if (!letterRegex.test(name)) {
      return { error: true, errorMessage: 'Solo se permiten letras' }
    }
    return { error: false, errorMessage: '' }
  }

  const validateSecondName = (secondName: string): InputError => {
    if (!secondName || secondName.trim() === '') {
      return { error: true, errorMessage: 'El segundo nombre es requerido' }
    }
    const letterRegex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]+$/
    if (!letterRegex.test(secondName)) {
      return { error: true, errorMessage: 'Solo se permiten letras' }
    }
    return { error: false, errorMessage: '' }
  }

  const validatePaternalLastName = (paternalLastName: string): InputError => {
    if (!paternalLastName || paternalLastName.trim() === '') {
      return { error: true, errorMessage: 'El apellido paterno es requerido' }
    }
    const letterRegex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]+$/
    if (!letterRegex.test(paternalLastName)) {
      return { error: true, errorMessage: 'Solo se permiten letras' }
    }
    return { error: false, errorMessage: '' }
  }

  const validateMaternalLastName = (maternalLastName: string): InputError => {
    if (!maternalLastName || maternalLastName.trim() === '') {
      return { error: true, errorMessage: 'El apellido materno es requerido' }
    }
    const letterRegex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]+$/
    if (!letterRegex.test(maternalLastName)) {
      return { error: true, errorMessage: 'Solo se permiten letras' }
    }
    return { error: false, errorMessage: '' }
  }

  const validateEmail = (email: string): InputError => {
    if (!email || email.trim() === '') {
      return { error: true, errorMessage: 'El correo electrónico es requerido' }
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      return { error: true, errorMessage: 'Correo electrónico inválido' }
    }
    return { error: false, errorMessage: '' }
  }

  const validateIdentifier = (identifier: string): InputError => {
    if (!identifier || identifier.trim() === '') {
      return { error: true, errorMessage: 'El identificador es requerido' }
    }
    const identifierRegex = /^[\w.-]+$/
    if (!identifierRegex.test(identifier)) {
      return { error: true, errorMessage: 'Identificador inválido' }
    }
    return { error: false, errorMessage: '' }
  }

  const validateCurp = (curp: string): InputError => {
    if (!curp || curp.trim() === '') {
      return { error: true, errorMessage: 'El CURP es requerido' }
    }
    const curpRegex = /^[\w.-]+$/
    if (!curpRegex.test(curp.toUpperCase())) {
      return { error: true, errorMessage: 'CURP inválido' }
    }
    return { error: false, errorMessage: '' }
  }

  const validatePassword = (password: string): InputError => {
    if (!password || password.trim() === '') {
      return { error: true, errorMessage: 'La contraseña es requerida' }
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    if (!passwordRegex.test(password)) {
      return {
        error: true,
        errorMessage:
          'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y símbolos',
      }
    }
    return { error: false, errorMessage: '' }
  }

  const validateRole = (
    role: { id: number; label: string } | null,
  ): InputError => {
    if (!role) {
      return { error: true, errorMessage: 'El rol es requerido' }
    }
    if (typeof role.id !== 'number' || role.id <= 0) {
      return { error: true, errorMessage: 'El rol seleccionado no es válido' }
    }
    return { error: false, errorMessage: '' }
  }

  const validateAllFields = (
    name: string,
    secondName: string,
    paternalLastName: string,
    maternalLastName: string,
    email: string,
    password: string,
    identifier: string,
    curp: string,
    role: { id: number; label: string } | null,
  ): boolean => {
    const newErrors: UserFormErrors = {
      name: validateName(name),
      secondName: validateSecondName(secondName),
      paternalLastName: validatePaternalLastName(paternalLastName),
      maternalLastName: validateMaternalLastName(maternalLastName),
      email: validateEmail(email),
      password:
        mode === 'create'
          ? validatePassword(password)
          : { error: false, errorMessage: '' },
      identifier: validateIdentifier(identifier),
      curp: validateCurp(curp),
      role: validateRole(role),
    }

    setErrors(newErrors)

    return !Object.values(newErrors).some((err) => err.error)
  }

  return {
    errors,
    updateErrors,

    validateName,
    validateSecondName,
    validatePaternalLastName,
    validateMaternalLastName,
    validateEmail,
    validatePassword,
    validateIdentifier,
    validateCurp,
    validateRole,
    validateAllFields,
  }
}
