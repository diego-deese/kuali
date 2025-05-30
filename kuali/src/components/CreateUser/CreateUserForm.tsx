import React from 'react'
import InputText from '../shared/InputText/InputText'
import SelectInput from '../shared/SelectInput'
import { useUserFormContext } from '../../context/UserFormContext/UserFormContext'
import { Text } from 'react-native'

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
    employeeNumber,
    categoriaProfr,
    sniDistinction,
    namingNumber,
    namingType,
    cvuNumber,
    researchLine,
    socialSecurityNumber,
    placementType,
    onNameChange,
    onSecondNameChange,
    onPaternalLastNameChange,
    onMaternalLastNameChange,
    onEmailChange,
    onPasswordChange,
    onIdentifierChange,
    onCurpChange,
    onRoleChange,
    onEmployeeNumberChange,
    onCategoriaProfrChange,
    onSniDistinctionChange,
    onNamingNumberChange,
    onNamingTypeChange,
    onCvuNumberChange,
    onResearchLineChange,
    onSocialSecurityNumberChange,
    onPlacementTypeChange,
    errors,
  } = useUserFormContext()

  const roleOptions = [
    { id: 2, label: 'Estudiante' },
    { id: 3, label: 'Investigador' },
    { id: 1, label: 'Administrador' },
  ]

  const categoriaOptions = [
    { id: 1, label: 'Profesor titular' },
    { id: 2, label: 'ES' },
  ]

  const sniDistinctioOptions = [
    { id: 1, label: 'Candidato' },
    { id: 2, label: 'Nivel 1' },
    { id: 3, label: 'Nivel 2' },
    { id: 4, label: 'Nivel 3' },
  ]

  const namingTypeOptions = [
    { id: 1, label: 'Colegiado' },
    { id: 2, label: 'Visitante' },
    { id: 3, label: 'Asignatura' },
    { id: 4, label: 'Asistente' },
    { id: 5, label: 'Otro' },
  ]

  const placementTypeOptions = [
    { id: 1, label: 'Base' },
    { id: 2, label: 'Interinato' },
    { id: 3, label: 'Confianza' },
    { id: 4, label: 'Otro' },
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
        label='Identificador'
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
      {role?.id === 3 && (
        <>
          <InputText
            label='Número de empleado'
            onChangeText={onEmployeeNumberChange}
            value={employeeNumber}
          />
          <SelectInput
            label='Categoría'
            options={categoriaOptions}
            onSelect={onCategoriaProfrChange}
            error={errors.role.error}
            errorMessage={errors.role.errorMessage}
          />
          <SelectInput
            label='Distinción SNI'
            options={sniDistinctioOptions}
            onSelect={onSniDistinctionChange}
            error={errors.role.error}
            errorMessage={errors.role.errorMessage}
          />
          <InputText
            label='Número de nombramiento'
            onChangeText={onNamingNumberChange}
            value={namingNumber}
          />
          <SelectInput
            label='Naming Type'
            options={namingTypeOptions}
            onSelect={onNamingTypeChange}
            error={errors.role.error}
            errorMessage={errors.role.errorMessage}
          />
          <InputText
            label='Número CVU'
            onChangeText={onCvuNumberChange}
            value={cvuNumber}
          />
          <InputText
            label='Línea de investigación'
            onChangeText={onResearchLineChange}
            value={researchLine}
          />
          <InputText
            label='Número de seguridad social'
            onChangeText={onSocialSecurityNumberChange}
            value={employeeNumber}
          />
          <SelectInput
            label='Tipo de plaza'
            options={placementTypeOptions}
            onSelect={onPlacementTypeChange}
            error={errors.role.error}
            errorMessage={errors.role.errorMessage}
          />
        </>
      )}
    </>
  )
}

export default CreateUserForm
