import React from 'react'
import InputText from '../shared/InputText/InputText'
import SelectInput from '../shared/SelectInput'

interface CreateUserFormProps {
  role?: number
  name?: string
  secondName?: string
  paternalLastName?: string
  maternalLastName?: string
  email?: string
  password?: string
  identifier?: string
  curp?: string
  setRole: (role_id: number) => void
  setName: (name: string) => void
  setSecondName: (name: string) => void
  setPaternalLastName: (name: string) => void
  setMaternalLastName: (name: string) => void
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setIdentifier: (id: string) => void
  setCURP: (curp: string) => void
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({
  setRole,
  setName,
  setSecondName,
  setPaternalLastName,
  setMaternalLastName,
  setEmail,
  setPassword,
  setIdentifier,
  setCURP,
}) => {
  const roleOptions = [
    { id: 2, label: 'Estudiante' },
    { id: 3, label: 'Investigador' },
    { id: 1, label: 'Administrador' },
  ]

  return (
    <>
      <SelectInput
        label='Tipo'
        options={roleOptions}
        onSelect={(option) => setRole(option.id as number)}
      />
      <InputText label='Primer nombre' onChangeText={setName} />
      <InputText label='Segundo nombre' onChangeText={setSecondName} />
      <InputText label='Apellido paterno' onChangeText={setPaternalLastName} />
      <InputText label='Apellido materno' onChangeText={setMaternalLastName} />
      <InputText label='Correo' onChangeText={setEmail} inputMode='email' />
      <InputText
        label='Contraseña'
        onChangeText={setPassword}
        secureTextEntry
      />
      <InputText label='Matrícula' onChangeText={setIdentifier} />
      <InputText label='CURP' onChangeText={setCURP} />
    </>
  )
}

export default CreateUserForm
