import React, { createContext, useContext } from 'react'
import { useUserForm } from './useUserForm'
import { UserFormErrors } from '../../types/Error'
import { Option } from '../../components/shared/SelectInput/interfaces'
import { User } from '../../types/User'

interface UserFormContextProps {
  mode: 'create' | 'edit'

  name: string
  setName: (value: string) => void
  onNameChange: (value: string) => void

  secondName: string
  setSecondName: (value: string) => void
  onSecondNameChange: (value: string) => void

  paternalLastName: string
  setPaternalLastName: (value: string) => void
  onPaternalLastNameChange: (value: string) => void

  maternalLastName: string
  setMaternalLastName: (value: string) => void
  onMaternalLastNameChange: (value: string) => void

  email: string
  setEmail: (value: string) => void
  onEmailChange: (value: string) => void

  personalEmail: string
  setPersonalEmail: (value: string) => void
  onPersonalEmailChange: (value: string) => void

  password: string
  setPassword: (value: string) => void
  onPasswordChange: (value: string) => void

  identifier: string
  setIdentifier: (value: string) => void
  onIdentifierChange: (value: string) => void

  curp: string
  setCurp: (value: string) => void
  onCurpChange: (value: string) => void

  role: Option | null
  setRole: (role: Option | null) => void
  onRoleChange: (role: Option | null) => void

  employeeNumber: string
  setEmployeeNumber: (value: string) => void
  onEmployeeNumberChange: (value: string) => void

  categoriaProfr: Option | null
  setCategoriaProfr: (value: Option | null) => void
  onCategoriaProfrChange: (value: Option | null) => void

  sniDistinction: string
  setSniDistinction: (value: Option | null) => void
  onSniDistinctionChange: (value: Option | null) => void

  namingNumber: string
  setNamingNumber: (value: string) => void
  onNamingNumberChange: (value: string) => void

  namingType: Option | null
  setNamingType: (value: Option | null) => void
  onNamingTypeChange: (value: Option | null) => void

  cvuNumber: string
  setCvuNumber: (value: string) => void
  onCvuNumberChange: (value: string) => void

  researchLine: string
  setResearchLine: (value: string) => void
  onResearchLineChange: (value: string) => void

  socialSecurityNumber: string
  setSocialSecurityNumber: (value: string) => void
  onSocialSecurityNumberChange: (value: string) => void

  placementType: Option | null
  setPlacementType: (value: Option | null) => void
  onPlacementTypeChange: (value: Option | null) => void

  errors: UserFormErrors
  updateErrors: (newErrors: Partial<UserFormErrors>) => void
  validateAllFields: (
    name: string,
    secondName: string,
    paternalLastName: string,
    maternalLastName: string,
    email: string,
    password: string,
    identifier: string,
    curp: string,
    role: Option | null,
  ) => boolean

  loading: boolean
  error: string | null
  user: User | null

  loadUserData: () => Promise<void>
  restartFields: () => void
  createUser: () => Promise<void>
  updateUser: () => Promise<boolean | undefined>
}

const UserFormContext = createContext<UserFormContextProps | undefined>(
  undefined,
)

export const useUserFormContext = () => {
  const context = useContext(UserFormContext)
  if (!context) {
    throw new Error('useUserFormContext must be used within a UserFormProvider')
  }
  return context
}

interface UserFormProviderProps {
  children: React.ReactNode
  mode: 'create' | 'edit'
  userId?: number
}

export const UserFormProvider = ({
  children,
  mode,
  userId,
}: UserFormProviderProps) => {
  const hookValue = useUserForm(mode, userId)

  const value: UserFormContextProps = {
    ...hookValue,
    loading: hookValue.loading ?? false,
    error: hookValue.error ?? null,
    user: hookValue.user ?? null,
  }

  return (
    <UserFormContext.Provider value={value}>
      {children}
    </UserFormContext.Provider>
  )
}
