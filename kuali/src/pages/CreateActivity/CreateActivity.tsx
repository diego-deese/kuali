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

const CreateActivity = () => {
  const { eventDate, limitDate, options, modal } = useCreateActivity()

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
        options={options}
      />

      <ConfirmationModal
        visible={modal.isModalVisible}
        title='Confirmar acción'
        description={`¿Eliminar el lugar "${options.options.find((option) => option.id === options.optionToDelete)?.label}"?`}
        onConfirm={options.confirmDeleteOption}
        onCancel={() => modal.setIsModalVisible(false)}
      />
    </View>
  )
}

export default CreateActivity
