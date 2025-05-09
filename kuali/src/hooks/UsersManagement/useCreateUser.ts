import { useState } from 'react'
import Toast from 'react-native-toast-message'
import userService from '../../services/user.service'
import authService from '../../services/auth.service'

export function useCreateUser() {
  const [role_id, setRole] = useState({ role_id: 0, name: '' })
  const [name, setName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [paternalLastName, setPaternalLastName] = useState('')
  const [maternalLastName, setMaternalLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [CURP, setCURP] = useState('')

  const newUser = {
    name: name,
    second_name: secondName,
    paternal_lastname: paternalLastName,
    maternal_lastname: maternalLastName,
    curp: CURP,
    identifier,
    institutional_email: email,
    password: password,
    role_id: role_id.role_id,
  }

  async function createUser() {
    const token = await authService.getToken()
    if (!token) {
      console.log('Token expirado o sin acceso')
      return
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
    }
  }

  return {
    setRole,
    setName,
    setSecondName,
    setPaternalLastName,
    setMaternalLastName,
    setEmail,
    setPassword,
    setIdentifier,
    setCURP,
    createUser,
    newUser,
  }
}
