import React from 'react'
import { FlatList, KeyboardAvoidingView, View } from 'react-native'
import { styles } from './styles'
import colors from '../../constants/colors'

import ButtonsHeader from '../../components/shared/ButtonsHeader/ButtonsHeader'
import IconButton from '../../components/shared/IconButton/IconButton'
import CreateActivityForm from '../../components/CreateActivity/CreateActivityForm/CreateActivityForm'
import ConfirmationModal from '../../components/shared/ConfirmationModal/ConfirmationModal'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import LoadingModal from '../../components/shared/LoadingModal/LoadingModal'

import { CheckIcon, CloseIcon } from '../../components/shared/Icons/Icons'

import { useCreateActivity } from '../../hooks/CreateActivity/useCreateActivity'
import { mapArrayToOptions } from '../../utils/mappers'

const CreateActivity = () => {
  const { eventDate, limitDate, location, modal, loading, loadingAction } =
    useCreateActivity()

  if (loading) {
    return <LoadingScreen message='Cargando la información...' />
  }

  const renderContent = () => (
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

      <LoadingModal visible={loadingAction} />
    </View>
  )

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
      // Use FlatList component to be able to scroll through page content if it
      overflows screen height and still be able to use another flatlists inside
      of it
      <FlatList
        data={[{ key: 'content' }]}
        renderItem={renderContent}
        keyExtractor={(item) => item.key}
      />
    </KeyboardAvoidingView>
  )
}

export default CreateActivity
