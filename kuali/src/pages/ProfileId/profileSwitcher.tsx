import React from 'react'
import WithRole from '../../components/WithRole/WithRole'
import { Roles } from '../../constants/roles'
import ProfileId from './profileId'
import { useUserProfile } from '../../hooks/useUserProfile'

const ProfileSwitcher = () => {
  const { userProfile, getProgramName } = useUserProfile()

  const fullName =
    `${userProfile?.name || ''} ${userProfile?.second_name || ''} ${userProfile?.paternal_lastname || ''} ${userProfile?.maternal_lastname || ''}`.trim()

  return (
    <>
      <WithRole role={Roles.STUDENT}>
        <ProfileId
          frontFields={[
            { label: 'Programa Académico', value: getProgramName() },
            {
              label: 'Correo institucional',
              value: userProfile?.institutional_email,
            },
          ]}
          extraFields={[
            { label: 'Nombre completo', value: fullName },
            { label: 'Programa Académico', value: getProgramName() },
            {
              label: 'Correo institucional',
              value: userProfile?.institutional_email,
            },
            { label: 'Correo personal', value: userProfile?.personal_email },
            { label: 'CURP', value: userProfile?.curp },
          ]}
        />
      </WithRole>

      <WithRole role={Roles.TEACHER}>
        <ProfileId
          frontFields={[
            { label: 'Categoría', value: getProgramName() },
            {
              label: 'SNI Distinción',
              value: userProfile?.sniDistinction || 'No disponible',
            },
            {
              label: 'Correo institucional',
              value: userProfile?.institutional_email,
            },
          ]}
          extraFields={[
            { label: 'Nombre completo', value: fullName },
            {
              label: 'No. empleado',
              value: userProfile?.employeeNumber || 'No disponible',
            },
            {
              label: 'Categoría',
              value: userProfile?.categoriaProfr || 'No disponible',
            },
            {
              label: 'Línea de investigación',
              value: userProfile?.researchLine || 'No disponible',
            },
            {
              label: 'No. seguro social',
              value: userProfile?.socialSecurityNumber || 'No disponible',
            },
            {
              label: 'Vigencia',
              value: userProfile?.validity
                ? new Date(userProfile.validity).toLocaleDateString()
                : 'No disponible',
            },
            { label: 'CVU', value: userProfile?.cvuNumber || 'No disponible' },
            {
              label: 'Tipo de nombramiento',
              value: userProfile?.namingType || 'No disponible',
            },
          ]}
        />
      </WithRole>
    </>
  )
}

export default ProfileSwitcher
