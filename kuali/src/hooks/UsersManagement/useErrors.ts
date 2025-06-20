import { useState } from 'react'
import { UserFormErrors, InputError } from '../../types/Error'

export const useErrors = (mode: string) => {
  const [errors, setErrors] = useState<UserFormErrors>({
    name: { error: false, errorMessage: '' },
    secondName: { error: false, errorMessage: '' },
    paternalLastName: { error: false, errorMessage: '' },
    maternalLastName: { error: false, errorMessage: '' },
    institutionalEmail: { error: false, errorMessage: '' },
    personalEmail: { error: false, errorMessage: '' },
    password: { error: false, errorMessage: '' },
    identifier: { error: false, errorMessage: '' },
    curp: { error: false, errorMessage: '' },
    role: { error: false, errorMessage: '' },
    employeeNumber: { error: false, errorMessage: '' },
    namingNumber: { error: false, errorMessage: '' },
    cvuNumber: { error: false, errorMessage: '' },
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
    // If empty, it's valid (optional field)
    if (!secondName || secondName.trim() === '') {
      return { error: false, errorMessage: '' }
    }
    // Only validate format if there's content
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

  const validateIEmail = (email: string): InputError => {
    if (!email || email.trim() === '') {
      return { error: true, errorMessage: 'El correo electrónico es requerido' }
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      return { error: true, errorMessage: 'Correo electrónico inválido' }
    }
    return { error: false, errorMessage: '' }
  }
  const validatePEmail = (email: string): InputError => {
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
    const curpRegex = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[A-Z0-9][0-9]$/
    if (!curpRegex.test(curp.toUpperCase())) {
      return {
        error: true,
        errorMessage:
          'CURP inválido. Debe tener 18 caracteres en formato válido',
      }
    }
    return { error: false, errorMessage: '' }
  }

  const validatePassword = (password: string): InputError => {
    if ((!password || password.trim() === '') && mode === 'create') {
      return { error: true, errorMessage: 'La contraseña es requerida' }
    }
    if (password.length < 8) {
      return {
        error: true,
        errorMessage: 'La contraseña debe tener al menos 8 caracteres',
      }
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    if (!passwordRegex.test(password)) {
      return {
        error: true,
        errorMessage:
          'La contraseña debe incluir mayúsculas, minúsculas, números y símbolos',
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

  const validateEmployeeNumber = (
    employeeNumber: string,
    isRequired: boolean = false,
  ): InputError => {
    if (isRequired && (!employeeNumber || employeeNumber.trim() === '')) {
      return { error: true, errorMessage: 'El número de empleado es requerido' }
    }
    if (employeeNumber && employeeNumber.trim() !== '') {
      const regex = /^[a-zA-Z0-9]{1,8}$/
      if (!regex.test(employeeNumber)) {
        return {
          error: true,
          errorMessage:
            'Número de empleado inválido (máximo 8 caracteres alfanuméricos)',
        }
      }
    }
    return { error: false, errorMessage: '' }
  }

  const validateNamingNumber = (
    namingNumber: string,
    isRequired: boolean = false,
  ): InputError => {
    if (isRequired && (!namingNumber || namingNumber.trim() === '')) {
      return {
        error: true,
        errorMessage: 'El número de nombramiento es requerido',
      }
    }
    if (namingNumber && namingNumber.trim() !== '') {
      const regex = /^[a-zA-Z0-9]{1,13}$/
      if (!regex.test(namingNumber)) {
        return {
          error: true,
          errorMessage:
            'Número de nombramiento inválido (máximo 13 caracteres alfanuméricos)',
        }
      }
    }
    return { error: false, errorMessage: '' }
  }

  const validateCvuNumber = (
    cvuNumber: string,
    isRequired: boolean = false,
  ): InputError => {
    if (isRequired && (!cvuNumber || cvuNumber.trim() === '')) {
      return { error: true, errorMessage: 'El número de CVU es requerido' }
    }
    if (cvuNumber && cvuNumber.trim() !== '') {
      const regex = /^[a-zA-Z0-9]{1,8}$/
      if (!regex.test(cvuNumber)) {
        return {
          error: true,
          errorMessage:
            'Número de CVU inválido (máximo 8 caracteres alfanuméricos)',
        }
      }
    }
    return { error: false, errorMessage: '' }
  }

  const validateAllFields = (formValues: {
    name: string
    secondName: string
    paternalLastName: string
    maternalLastName: string
    institutionalEmail: string
    personalEmail: string
    password: string
    identifier: string
    curp: string
    role: { id: number; label: string } | null
    employeeNumber?: string
    namingNumber?: string
    cvuNumber?: string
  }): boolean => {
    const {
      name,
      secondName,
      paternalLastName,
      maternalLastName,
      institutionalEmail,
      personalEmail,
      password,
      identifier,
      curp,
      role,
      employeeNumber,
      namingNumber,
      cvuNumber,
    } = formValues

    const isRoleSpecificFieldsRequired = role?.id === 3

    const allErrors: UserFormErrors = {
      name: validateName(name),
      secondName: validateSecondName(secondName),
      paternalLastName: validatePaternalLastName(paternalLastName),
      maternalLastName: validateMaternalLastName(maternalLastName),
      institutionalEmail: validateIEmail(institutionalEmail),
      personalEmail: validatePEmail(personalEmail),
      password:
        mode === 'create'
          ? validatePassword(password)
          : { error: false, errorMessage: '' },
      identifier: validateIdentifier(identifier),
      curp: validateCurp(curp),
      role: validateRole(role),
      employeeNumber: validateEmployeeNumber(
        employeeNumber || '',
        isRoleSpecificFieldsRequired,
      ),
      namingNumber: validateNamingNumber(
        namingNumber || '',
        isRoleSpecificFieldsRequired,
      ),
      cvuNumber: validateCvuNumber(
        cvuNumber || '',
        isRoleSpecificFieldsRequired,
      ),
    }

    setErrors(allErrors)

    return !Object.values(allErrors).some((e) => e.error)
  }

  const clearRoleSpecificErrors = () => {
    updateErrors({
      employeeNumber: { error: false, errorMessage: '' },
      namingNumber: { error: false, errorMessage: '' },
      cvuNumber: { error: false, errorMessage: '' },
    })
  }
  return {
    errors,
    updateErrors,
    clearRoleSpecificErrors,

    validateName,
    validateSecondName,
    validatePaternalLastName,
    validateMaternalLastName,
    validateIEmail,
    validatePEmail,
    validatePassword,
    validateIdentifier,
    validateCurp,
    validateRole,
    validateEmployeeNumber,
    validateNamingNumber,
    validateCvuNumber,
    validateAllFields,
  }
}
