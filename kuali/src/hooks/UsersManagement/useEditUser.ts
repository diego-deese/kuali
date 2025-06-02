import { useEffect, useState } from 'react'
import userService from '../../services/user.service'
import authService from '../../services/auth.service'
import Toast from 'react-native-toast-message'
import { User } from '../../types/User'
import { ResponseError } from '../../types/Request'

export function useEditUser(userId: string) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [paternalLastName, setPaternalLastName] = useState('')
  const [maternalLastName, setMaternalLastName] = useState('')
  const [institutionalEmail, setInstitutionalEmail] = useState('')
  const [personalEmail, setPersonalEmail] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [curp, setCurp] = useState('')
  const [role, setRole] = useState<{ role_id: number; name: string } | null>(
    null,
  )
  const [password, setPassword] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const token = await authService.getToken()
        if (!token) {
          throw new Error('Token expirado o sin acceso')
        }

        const response = await userService.getUserProfile(Number(userId))

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
        setRole(userData.role)

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
    }

    if (userId) {
      fetchUser()
    }
  }, [userId])

  const updateUser = async () => {
    try {
      const updatedUser = {
        name,
        second_name: secondName,
        paternal_lastname: paternalLastName,
        maternal_lastname: maternalLastName,
        institutional_email: institutionalEmail,
        personal_email: personalEmail,
        identifier,
        curp,
        role_id: role?.role_id,
      }

      const token = await authService.getToken()
      if (!token) {
        throw new Error('Token expirado o sin acceso')
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
      } else {
        Toast.show({
          type: 'success',
          text1: 'Usuario actualizado con éxito',
        })
      }

      return true
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
    loading,
    error,
    user,

    name,
    secondName,
    paternalLastName,
    maternalLastName,
    institutionalEmail,
    personalEmail,
    identifier,
    curp,
    role,
    password,

    setName,
    setSecondName,
    setPaternalLastName,
    setMaternalLastName,
    setInstitutionalEmail,
    setPersonalEmail,
    setIdentifier,
    setCurp,
    setRole,
    setPassword,

    updateUser,
  }
}
