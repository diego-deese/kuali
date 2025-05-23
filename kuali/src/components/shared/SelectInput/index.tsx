import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import IconButton from '../IconButton/IconButton'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'
import colors from '../../../constants/colors'
import { styles } from './styles'

import { ArrowDownIcon, RightArrowIcon } from '../Icons/Icons'

import { SelectInputProps } from './interfaces'

import { useSelectInput } from './useSelectInput'
import OptionsModal from './OptionsModal/OptionsModal'

const SelectInput = ({
  label,
  headerInputPlaceholder,
  placeholder = 'Selecciona una opción',
  options = [],
  editable = false,
  value,
  error = false,
  errorMessage = '',
  onSelect,
  onEditOption,
  onDeleteOption,
  onAddOption,
}: SelectInputProps) => {
  const { state, actions } = useSelectInput({
    value,
    onSelect,
    onDeleteOption,
    onAddOption,
  })

  const myOptions = [
    {
      id: 1,
      label: 'Option',
    },
    {
      id: 2,
      label: 'Option',
    },
    {
      id: 3,
      label: 'Option',
    },
    {
      id: 4,
      label: 'Option',
    },
    {
      id: 5,
      label: 'Option',
    },
    {
      id: 7,
      label: 'Option',
    },
    {
      id: 8,
      label: 'Option',
    },
    {
      id: 9,
      label: 'Option',
    },
    {
      id: 10,
      label: 'Option',
    },
    {
      id: 11,
      label: 'Option',
    },
    {
      id: 12,
      label: 'Option',
    },
    {
      id: 13,
      label: 'Option',
    },
    {
      id: 14,
      label: 'Option',
    },
    {
      id: 15,
      label: 'Option',
    },
    {
      id: 17,
      label: 'Option',
    },
    {
      id: 18,
      label: 'Option',
    },
    {
      id: 19,
      label: 'Option',
    },
  ]

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[
          styles.optionContainer,
          error && { borderColor: colors.warningRed },
        ]}
        onPress={() => actions.setIsOpen(!state.isOpen)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.selectedOption,
            state.selectedOption ? { color: colors.fontBlack } : {},
          ]}
        >
          {state.selectedOption ? state.selectedOption.label : placeholder}
        </Text>
        <IconButton
          icon={
            state.isOpen ? (
              <ArrowDownIcon size={28} />
            ) : (
              <RightArrowIcon size={28} />
            )
          }
          onPress={() => actions.setIsOpen(!state.isOpen)}
        />
      </TouchableOpacity>
      {error && <Text style={styles.errorLabel}>{errorMessage}</Text>}

      <OptionsModal
        visible={state.isOpen}
        editable={editable}
        onRequestClose={() => actions.setIsOpen(false)}
        handleAddOption={actions.handleAddOption}
        options={options}
        headerInputPlaceholder={headerInputPlaceholder}
        handleOptionSelect={actions.handleOptionSelect}
        onEditOption={onEditOption}
        handleDeleteOption={actions.handleDeleteOption}
      />

      <ConfirmationModal
        visible={state.isModalVisible}
        title='Confirmar acción'
        confirmButtonText='Eliminar'
        confirmButtonColor={colors.warningRed}
        description={`¿Eliminar "${state.optionToDelete?.label}"? Esta acción no se puede deshacer.`}
        onConfirm={() =>
          actions.handleConfirmDeleteOption(state.optionToDelete?.id)
        }
        onCancel={() => actions.setIsModalVisible(false)}
      />
    </View>
  )
}

export default SelectInput
