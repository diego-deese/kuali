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
    institutionalEmail,
    personalEmail,
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
    onInstitutionalEmailChange,
    onPersonalEmailChange,
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
        label='Correo institucional'
        onChangeText={onInstitutionalEmailChange}
        inputMode='email'
        value={institutionalEmail}
        error={errors.email.error}
        errorMessage={errors.email.errorMessage}
      />
      <InputText
        label='Correo personal'
        onChangeText={onPersonalEmailChange}
        inputMode='email'
        value={personalEmail}
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
            error={errors.employeeNumber.error}
            errorMessage={errors.employeeNumber.errorMessage}
          />
          <SelectInput
            label='Categoría'
            options={categoriaOptions}
            value={categoriaProfr}
            onSelect={onCategoriaProfrChange}
          />
          <SelectInput
            label='Distinción SNI'
            options={sniDistinctioOptions}
            value={sniDistinction}
            onSelect={onSniDistinctionChange}
          />
          <InputText
            label='Número de nombramiento'
            onChangeText={onNamingNumberChange}
            value={namingNumber}
            error={errors.namingNumber.error}
            errorMessage={errors.namingNumber.errorMessage}
          />
          <SelectInput
            label='Tipo de nombramiento'
            options={namingTypeOptions}
            value={namingType}
            onSelect={onNamingTypeChange}
          />
          <InputText
            label='Número CVU'
            value={cvuNumber}
            onChangeText={onCvuNumberChange}
            error={errors.cvuNumber.error}
            errorMessage={errors.cvuNumber.errorMessage}
          />
        </>
      )}
    </>
  )
}

export default CreateUserForm
