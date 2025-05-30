import { useState, useCallback, useEffect } from 'react'
import { useErrors } from '../../hooks/UsersManagement/useErrors'
import authService from '../../services/auth.service'
import userService from '../../services/user.service'
import Toast from 'react-native-toast-message'
import { User } from '../../types/User'
import { Option } from '../../components/shared/SelectInput/interfaces'

export const useUserForm = (mode: 'create' | 'edit', userId?: number) => {
  const errorsManagement = useErrors(mode)

  const [name, setName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [paternalLastName, setPaternalLastName] = useState('')
  const [maternalLastName, setMaternalLastName] = useState('')
  const [password, setPassword] = useState('')
  const [institutionalEmail, setInstitutionalEmail] = useState('')
  const [personalEmail, setPersonalEmail] = useState('')
  const [curp, setCurp] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [role, setRole] = useState<Option | null>(null)
  const [loading, setLoading] = useState(mode === 'edit')
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)

  const loadUserData = useCallback(async () => {
    if (!userId) return

    try {
      const token = await authService.getToken()
      if (!token) throw new Error('Token expirado o sin acceso')

      const response = await userService.getUserProfile(userId)

      if ('success' in response && !response.success) {
        throw new Error(response.message)
      }

      const userData = response as User

      setName(userData.name || '')
      setSecondName(userData.second_name || '')
      setPaternalLastName(userData.paternal_lastname || '')
      setMaternalLastName(userData.maternal_lastname || '')
      setInstitutionalEmail(userData.institutional_email || '')
      setPersonalEmail(userData.personal_email || '')
      setIdentifier(userData.identifier || '')
      setCurp(userData.curp || '')
      setRole(
        userData.role
          ? {
              id: userData.role.role_id,
              label: userData.role.name,
            }
          : null,
      )

      setUser(userData)
      setError(null)
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Error desconocido al cargar el perfil'

      setError(errorMessage)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      })
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    if (mode === 'edit' && userId) {
      loadUserData()
    }
  }, [mode, userId, loadUserData])

  const restartFields = (): void => {
    setName('')
    setSecondName('')
    setPaternalLastName('')
    setMaternalLastName('')
    setInstitutionalEmail('')
    setPersonalEmail('')
    setIdentifier('')
    setCurp('')
    setRole(null)
    setPassword('')
  }

  const onNameChange = (value: string) => {
    setName(value)
    errorsManagement.updateErrors({
      name: errorsManagement.validateName(value),
    })
  }

  const onSecondNameChange = (value: string) => {
    setSecondName(value)
    errorsManagement.updateErrors({
      secondName: errorsManagement.validateSecondName(value),
    })
  }

  const onPaternalLastNameChange = (value: string) => {
    setPaternalLastName(value)
    errorsManagement.updateErrors({
      paternalLastName: errorsManagement.validatePaternalLastName(value),
    })
  }

  const onMaternalLastNameChange = (value: string) => {
    setMaternalLastName(value)
    errorsManagement.updateErrors({
      maternalLastName: errorsManagement.validateMaternalLastName(value),
    })
  }

  const onInstitutionalEmailChange = (value: string) => {
    setInstitutionalEmail(value)
    errorsManagement.updateErrors({
      email: errorsManagement.validateEmail(value),
    })
  }

  const onPersonalEmailChange = (value: string) => {
    setPersonalEmail(value)
    errorsManagement.updateErrors({
      email: errorsManagement.validateEmail(value),
    })
  }

  const onPasswordChange = (value: string) => {
    setPassword(value)
    errorsManagement.updateErrors({
      password: errorsManagement.validatePassword(value),
    })
  }

  const onCurpChange = (value: string) => {
    setCurp(value)
    errorsManagement.updateErrors({
      curp: errorsManagement.validateCurp(value),
    })
  }

  const onIdentifierChange = (value: string) => {
    setIdentifier(value)
    errorsManagement.updateErrors({
      identifier: errorsManagement.validateIdentifier(value),
    })
  }

  const onRoleChange = (value: Option | null) => {
    setRole(value)
    errorsManagement.updateErrors({
      role: errorsManagement.validateRole(value),
    })
  }

  const createUser = async () => {
    const token = await authService.getToken()
    if (!token) {
      console.log('Token expirado o sin acceso')
      return
    }

    const allFieldsCorrect = errorsManagement.validateAllFields(
      name,
      secondName,
      paternalLastName,
      maternalLastName,
      institutionalEmail,
      password,
      curp,
      identifier,
      role ? { id: role.id, label: role.label } : null,
    )

    if (allFieldsCorrect) {
      const newUser = {
        name,
        second_name: secondName,
        paternal_lastname: paternalLastName,
        maternal_lastname: maternalLastName,
        curp,
        identifier,
        institutional_email: institutionalEmail,
        password,
        role_id: role?.id,
      }

      const result = await userService.createProfile(newUser)

      if (result.success === false) {
        Toast.show({
          type: 'error',
          text1: result.message,
          text2: result.error,
        })
      } else {
        Toast.show({
          type: 'success',
          text1: 'Usuario creado con éxito',
          text2: `ID: ${result.data.user.user_id}`,
        })
        restartFields()
      }
    }
  }

  const updateUser = async () => {
    try {
      const token = await authService.getToken()
      if (!token) {
        console.log('Token expirado o sin acceso')
        return false
      }

      const fieldsToValidate =
        mode === 'edit'
          ? [
              name,
              secondName,
              paternalLastName,
              maternalLastName,
              institutionalEmail,
              '',
              identifier,
              curp,
              role,
            ]
          : [
              name,
              secondName,
              paternalLastName,
              maternalLastName,
              institutionalEmail,
              password,
              identifier,
              curp,
              role,
            ]

      const allFieldsCorrect = errorsManagement.validateAllFields(
        name,
        secondName,
        paternalLastName,
        maternalLastName,
        institutionalEmail,
        mode === 'edit' ? '' : password,
        identifier,
        curp,
        role,
      )

      if (allFieldsCorrect) {
        const updatedUser = {
          name,
          second_name: secondName,
          paternal_lastname: paternalLastName,
          maternal_lastname: maternalLastName,
          institutional_email: institutionalEmail,
          personal_email: personalEmail,
          identifier,
          curp,
          role_id: role?.id,
        }

        const response = await userService.updateProfile(
          Number(userId),
          updatedUser,
        )

        if (!response.success) {
          Toast.show({
            type: 'error',
            text1: 'El usuario no se pudo actualizar',
          })
          return false
        } else {
          Toast.show({
            type: 'success',
            text1: 'Usuario actualizado con éxito',
          })
          return true
        }
      }
      return false
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error al actualizar el usuario'
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      })
      return false
    }
  }

  return {
    mode,
    name,
    setName,
    secondName,
    setSecondName,
    paternalLastName,
    setPaternalLastName,
    maternalLastName,
    setMaternalLastName,
    password,
    setPassword,
    email: institutionalEmail,
    setEmail: setInstitutionalEmail,
    onEmailChange: onInstitutionalEmailChange,
    personalEmail,
    setPersonalEmail,
    curp,
    setCurp,
    identifier,
    setIdentifier,
    role,
    setRole,
    onRoleChange,

    loading,
    error,
    user,

    errors: errorsManagement.errors,
    updateErrors: errorsManagement.updateErrors,
    validateAllFields: errorsManagement.validateAllFields,

    loadUserData,
    restartFields,

    onNameChange,
    onSecondNameChange,
    onPaternalLastNameChange,
    onMaternalLastNameChange,
    onInstitutionalEmailChange,
    onPersonalEmailChange,
    onPasswordChange,
    onCurpChange,
    onIdentifierChange,
    createUser,
    updateUser,
  }
}
