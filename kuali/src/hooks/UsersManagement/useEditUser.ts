import { useEffect, useState } from 'react'
import userService from '../../services/user.service'
import authService from '../../services/auth.service'
import Toast from 'react-native-toast-message'
import { User } from '../../types/User'

export function useEditUser(userId: string) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Form states
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
  // Password is separate as it's likely only for updates
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

        // Check if response has an error structure
        if ('success' in response && !response.success) {
          throw new Error(
            response.message || 'No se pudo cargar la información del perfil',
          )
        }

        // If we get here, we should have a valid user response
        const userData = response as User // Handle both { user: {...} } and direct user object

        // Update all state values from the fetched user data
        setName(userData.name || '')
        setSecondName(userData.second_name || '')
        setPaternalLastName(userData.paternal_lastname || '')
        setMaternalLastName(userData.maternal_lastname || '')
        setInstitutionalEmail(userData.institutional_email || '')
        setPersonalEmail(userData.personal_email || '')
        setIdentifier(userData.identifier || '')
        setCurp(userData.curp || '')

        // Handle role properly - it's an object from the API
        if (userData.role) {
          setRole(userData.role)
        }

        // Handle academic programs
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

  // Function to update user
  const updateUser = async () => {
    try {
      // Build user object from state
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
        // Only include password if it was changed
        ...(password ? { password } : {}),
      }

      // Call your update service here
      // const result = await userService.updateUser(Number(userId), updatedUser)

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
    // Status fields
    loading,
    error,
    user,

    // Form fields
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

    // Setters
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

    // Actions
    updateUser,
  }
}
