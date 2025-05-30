import React from 'react'
import InputText from '../shared/InputText/InputText'
import SelectInput from '../shared/SelectInput'
import { useUserFormContext } from '../../context/UserFormContext/UserFormContext'

interface CreateUserFormProps {
  onEditing: boolean
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ onEditing }) => {
  const {
    name,
    secondName,
    paternalLastName,
    maternalLastName,
    email,
    password,
    identifier,
    curp,
    role,
    onNameChange,
    onSecondNameChange,
    onPaternalLastNameChange,
    onMaternalLastNameChange,
    onEmailChange,
    onPasswordChange,
    onIdentifierChange,
    onCurpChange,
    onRoleChange,
    errors,
  } = useUserFormContext()

  const roleOptions = [
    { id: 2, label: 'Estudiante' },
    { id: 3, label: 'Investigador' },
    { id: 1, label: 'Administrador' },
  ]

  return (
    <>
      {!onEditing && (
        <SelectInput
          label='Tipo'
          options={roleOptions}
          value={role}
          onSelect={onRoleChange}
          error={errors.role.error}
          errorMessage={errors.role.errorMessage}
        />
      )}
      <InputText
        label='Primer nombre'
        onChangeText={onNameChange}
        value={name}
        error={errors.name.error}
        errorMessage={errors.name.errorMessage}
      />
      <InputText
        label='Segundo nombre'
        onChangeText={onSecondNameChange}
        value={secondName}
        error={errors.secondName.error}
        errorMessage={errors.secondName.errorMessage}
      />
      <InputText
        label='Apellido paterno'
        onChangeText={onPaternalLastNameChange}
        value={paternalLastName}
        error={errors.paternalLastName.error}
        errorMessage={errors.paternalLastName.errorMessage}
      />
      <InputText
        label='Apellido materno'
        onChangeText={onMaternalLastNameChange}
        value={maternalLastName}
        error={errors.maternalLastName.error}
        errorMessage={errors.maternalLastName.errorMessage}
      />
      <InputText
        label='Correo'
        onChangeText={onEmailChange}
        inputMode='email'
        value={email}
        error={errors.email.error}
        errorMessage={errors.email.errorMessage}
      />
      {!onEditing && (
        <InputText
          label='Contraseña'
          onChangeText={onPasswordChange}
          secureTextEntry
          value={password}
          error={errors.password.error}
          errorMessage={errors.password.errorMessage}
        />
      )}
      <InputText
        label='Matrícula'
        onChangeText={onIdentifierChange}
        value={identifier}
        error={errors.identifier.error}
        errorMessage={errors.identifier.errorMessage}
      />
      <InputText
        label='CURP'
        onChangeText={onCurpChange}
        value={curp}
        error={errors.curp.error}
        errorMessage={errors.curp.errorMessage}
      />
    </>
  )
}

export default CreateUserForm
