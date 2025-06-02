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
  const [institutionalEmail, setInstitutionalEmail] = useState(null)
  const [personalEmail, setPersonalEmail] = useState(null)
  const [curp, setCurp] = useState(null)
  const [identifier, setIdentifier] = useState('')
  const [role, setRole] = useState<Option | null>(null)

  const [employeeNumber, setEmployeeNumber] = useState('')
  const [namingNumber, setNamingNumber] = useState('')
  const [cvuNumber, setCvuNumber] = useState('')

  const [categoriaProfr, setCategoriaProfr] = useState<Option | null>(null)
  const [sniDistinction, setSniDistinction] = useState<Option | null>(null)
  const [ediLevel, setEdiLevel] = useState<Option | null>(null)
  const [namingType, setNamingType] = useState<Option | null>(null)
  const [researchLine, setResearchLine] = useState('')
  const [socialSecurityNumber, setSocialSecurityNumber] = useState('')
  const [placementType, setPlacementType] = useState<Option | null>(null)

  const [loading, setLoading] = useState(mode === 'edit')
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)

  const loadUserData = useCallback(async () => {
    if (!userId) return

    try {
      setLoading(true)
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
      setInstitutionalEmail(userData.institutional_email || null)
      setPersonalEmail(userData.personal_email || null)
      setIdentifier(userData.identifier || null)
      setCurp(userData.curp || '')
      setRole(
        userData.role
          ? { id: userData.role.role_id, label: userData.role.name }
          : null,
      )
      setEmployeeNumber(userData.employeeNumber || null)
      setCategoriaProfr(
        userData.categoriaProfr
          ? { id: 0, label: userData.categoriaProfr }
          : null,
      )
      setSniDistinction(
        userData.sniDistinction
          ? { id: 0, label: userData.sniDistinction }
          : null,
      )
      setEdiLevel(
        userData.ediLevel ? { id: 0, label: userData.ediLevel } : null,
      )
      setNamingNumber(userData.namingNumber || null)
      setNamingType(
        userData.namingType ? { id: 0, label: userData.namingType } : null,
      )
      setCvuNumber(userData.cvuNumber || null)
      setResearchLine(userData.researchLine || null)
      setSocialSecurityNumber(userData.socialSecurityNumber || null)
      setPlacementType(
        userData.placementType
          ? { id: 0, label: userData.placementType }
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
      Toast.show({ type: 'error', text1: 'Error', text2: errorMessage })
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    if (mode === 'edit' && userId) {
      loadUserData()
    }
  }, [mode, userId, loadUserData])

  const restartFields = () => {
    setName('')
    setSecondName('')
    setPaternalLastName('')
    setMaternalLastName('')
    setInstitutionalEmail('')
    setPersonalEmail('')
    setPassword('')
    setCurp('')
    setIdentifier('')
    setRole(null)
    setEmployeeNumber('')
    setCategoriaProfr(null)
    setSniDistinction(null)
    setEdiLevel(null)
    setNamingNumber('')
    setNamingType(null)
    setCvuNumber('')
    setResearchLine('')
    setSocialSecurityNumber('')
    setPlacementType(null)

    errorsManagement.updateErrors({
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
      institutionalEmail: errorsManagement.validateIEmail(value),
    })
  }

  const onPersonalEmailChange = (value: string) => {
    setPersonalEmail(value)
    errorsManagement.updateErrors({
      personalEmail: errorsManagement.validatePEmail(value),
    })
  }

  const onPasswordChange = (value: string) => {
    setPassword(value)
    if (mode === 'create') {
      errorsManagement.updateErrors({
        password: errorsManagement.validatePassword(value),
      })
    }
  }

  const onCurpChange = (value: string) => {
    setCurp(value.toUpperCase())
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

    if (value?.id !== 3) {
      errorsManagement.clearRoleSpecificErrors()
    } else {
      const isRequired = value?.id === 3
      errorsManagement.updateErrors({
        employeeNumber: errorsManagement.validateEmployeeNumber(
          employeeNumber,
          isRequired,
        ),
        namingNumber: errorsManagement.validateNamingNumber(
          namingNumber,
          isRequired,
        ),
        cvuNumber: errorsManagement.validateCvuNumber(cvuNumber, isRequired),
      })
    }
  }

  const onEmployeeNumberChange = (value: string) => {
    setEmployeeNumber(value)
    const isRequired = role?.id === 3
    errorsManagement.updateErrors({
      employeeNumber: errorsManagement.validateEmployeeNumber(
        value,
        isRequired,
      ),
    })
  }

  const onNamingNumberChange = (value: string) => {
    setNamingNumber(value)
    const isRequired = role?.id === 3
    errorsManagement.updateErrors({
      namingNumber: errorsManagement.validateNamingNumber(value, isRequired),
    })
  }

  const onCvuNumberChange = (value: string) => {
    setCvuNumber(value)
    const isRequired = role?.id === 3
    errorsManagement.updateErrors({
      cvuNumber: errorsManagement.validateCvuNumber(value, isRequired),
    })
  }

  const onCategoriaProfrChange = (value: Option | null) =>
    setCategoriaProfr(value)
  const onSniDistinctionChange = (value: Option | null) =>
    setSniDistinction(value)
  const onEdiChange = (value: Option | null) => setEdiLevel(value)
  const onNamingTypeChange = (value: Option | null) => setNamingType(value)
  const onResearchLineChange = (value: string) => setResearchLine(value)
  const onSocialSecurityNumberChange = (value: string) =>
    setSocialSecurityNumber(value)
  const onPlacementTypeChange = (value: Option | null) =>
    setPlacementType(value)

  const createUser = async () => {
    try {
      const token = await authService.getToken()
      if (!token) {
        Toast.show({ type: 'error', text1: 'Token expirado o sin acceso' })
        return false
      }
      const allFieldsCorrect = errorsManagement.validateAllFields({
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
      })

      if (!allFieldsCorrect) {
        Toast.show({
          type: 'error',
          text1: 'Por favor corrija los errores en el formulario',
        })
        return false
      }

      setLoading(true)

      const newUser = {
        name,
        second_name: secondName,
        paternal_lastname: paternalLastName,
        maternal_lastname: maternalLastName,
        institutional_email: institutionalEmail,
        password,
        personal_email: personalEmail || null,
        identifier,
        curp,
        role_id: role?.id,
        employeeNumber: employeeNumber || null,
        categoriaProfr: categoriaProfr?.label || null,
        sniDistinction: sniDistinction?.label || null,
        ediLevel: Number(ediLevel?.label) || null,
        namingNumber: namingNumber || null,
        namingType: namingType?.label || null,
        cvuNumber: cvuNumber || null,
        researchLine: researchLine || null,
        socialSecurityNumber: socialSecurityNumber || null,
        placementType: placementType?.label || '',
      }
      console.log(null)
      const result = await userService.createProfile(newUser)
      console.log(result)
      if (!result.success) {
        Toast.show({
          type: 'error',
          text1: 'Error al crear usuario',
        })
        return false
      } else {
        Toast.show({
          type: 'success',
          text1: 'Usuario creado',
          text2: `ID: ${result.data.user.user_id}`,
        })
        restartFields()
        return true
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error inesperado',
        text2: 'No se pudo crear el usuario',
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  const updateUser = async () => {
    try {
      const token = await authService.getToken()
      if (!token) {
        Toast.show({ type: 'error', text1: 'Token expirado o sin acceso' })
        return false
      }

      const allFieldsCorrect = errorsManagement.validateAllFields({
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
      })

      if (!allFieldsCorrect) {
        Toast.show({
          type: 'error',
          text1: 'Por favor corrija los errores en el formulario',
        })
        return false
      }

      setLoading(true)

      const updatedUser = {
        name,
        second_name: secondName,
        paternal_lastname: paternalLastName,
        maternal_lastname: maternalLastName,
        institutional_email: institutionalEmail,
        personal_email: personalEmail || null,
        identifier,
        curp,
        role_id: role?.id,
        employeeNumber: employeeNumber || null,
        categoriaProfr: categoriaProfr?.label || null,
        sniDistinction: sniDistinction?.label || null,
        ediLevel: Number(ediLevel?.label) || null,
        namingNumber: namingNumber || null,
        namingType: namingType?.label || null,
        cvuNumber: cvuNumber || null,
        researchLine: researchLine || null,
        socialSecurityNumber: socialSecurityNumber || null,
        placementType: placementType?.label || '',
      }
      const response = await userService.updateProfile(
        Number(userId),
        updatedUser,
      )
      if (!response.success) {
        Toast.show({
          type: 'error',
          text1: 'Error al actualizar',
          text2: 'No se pudo actualizar el usuario',
        })
        return false
      }

      Toast.show({ type: 'success', text1: 'Usuario actualizado con éxito' })
      return true
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error inesperado',
        text2: 'No se pudo actualizar el usuario',
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  const shouldShowRoleSpecificFields = role?.id === 3

  return {
    mode,
    loading,
    error,
    user,
    shouldShowRoleSpecificFields,

    name,
    secondName,
    paternalLastName,
    maternalLastName,
    institutionalEmail,
    personalEmail,
    password,
    curp,
    identifier,
    role,
    employeeNumber,
    categoriaProfr,
    sniDistinction,
    ediLevel,
    namingNumber,
    namingType,
    cvuNumber,
    researchLine,
    socialSecurityNumber,
    placementType,

    setName,
    setSecondName,
    setPaternalLastName,
    setMaternalLastName,
    setInstitutionalEmail,
    setPersonalEmail,
    setPassword,
    setCurp,
    setIdentifier,
    setRole,
    setEmployeeNumber,
    setCategoriaProfr,
    setSniDistinction,
    setEdiLevel,
    setNamingNumber,
    setNamingType,
    setCvuNumber,
    setResearchLine,
    setSocialSecurityNumber,
    setPlacementType,

    onNameChange,
    onSecondNameChange,
    onPaternalLastNameChange,
    onMaternalLastNameChange,
    onInstitutionalEmailChange,
    onPersonalEmailChange,
    onPasswordChange,
    onCurpChange,
    onIdentifierChange,
    onRoleChange,
    onEmployeeNumberChange,
    onCategoriaProfrChange,
    onSniDistinctionChange,
    onEdiChange,
    onNamingNumberChange,
    onNamingTypeChange,
    onCvuNumberChange,
    onResearchLineChange,
    onSocialSecurityNumberChange,
    onPlacementTypeChange,

    createUser,
    updateUser,
    loadUserData,
    restartFields,

    errors: errorsManagement.errors,
    updateErrors: errorsManagement.updateErrors,
    validateAllFields: errorsManagement.validateAllFields,
  }
}
