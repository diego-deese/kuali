import React from 'react'
import { View } from 'react-native'
import { styles } from './styles'
import colors from '../../constants/colors'

import ButtonsHeader from '../../components/shared/ButtonsHeader/ButtonsHeader'
import IconButton from '../../components/shared/IconButton/IconButton'
import CreateActivityForm from '../../components/CreateActivity/CreateActivityForm/CreateActivityForm'
import ConfirmationModal from '../../components/shared/ConfirmationModal/ConfirmationModal'

import { CheckIcon, CloseIcon } from '../../components/shared/Icons/Icons'

import { useCreateActivity } from '../../hooks/CreateActivity/useCreateActivity'
import { mapArrayToOptions } from '../../utils/mappers'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

const CreateActivity = () => {
  const { eventDate, limitDate, location, modal, loading } = useCreateActivity()

  if (loading) {
    return <LoadingScreen message='Cargando la información...' />
  }

  return (
    <View style={styles.container}>
      <ButtonsHeader title='Crear Evento'>
        <IconButton icon={<CloseIcon size={32} color={colors.warningRed} />} />
        <IconButton
          icon={<CheckIcon size={32} color={colors.selectionBlue} />}
        />
      </ButtonsHeader>

      <CreateActivityForm
        eventDate={eventDate}
        limitDate={limitDate}
        location={{
          ...location,
          locations: location.locations
            ? mapArrayToOptions(location.locations, 'location_id', 'name')
            : [],
        }}
      />

      <ConfirmationModal
        visible={modal.isModalVisible}
        title='Confirmar acción'
        confirmButtonText='Eliminar'
        confirmButtonColor={colors.warningRed}
        description={`¿Eliminar el lugar "${location.locationToDelete?.name}"?`}
        onConfirm={location.confirmDeleteLocation}
        onCancel={() => modal.setIsModalVisible(false)}
      />
    </View>
  )
}

export default CreateActivity
