import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'

import AddNewHeader from './AddNewHeader/AddNewHeader'
import IconButton from '../IconButton/IconButton'
import OptionComponent from './Option/Option'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'
import colors from '../../../constants/colors'
import { styles } from './styles'

import { ArrowDownIcon, RightArrowIcon } from '../Icons/Icons'

import { SelectInputProps } from './interfaces'

import { useSelectInput } from './useSelectInput'

const SelectInput = ({
  label,
  placeholder = 'Selecciona una opción',
  options = [],
  editable = false,
  onEditOption,
  onDeleteOption,
  onSelect,
  value,
}: SelectInputProps) => {
  const { state, actions } = useSelectInput({
    options,
    value,
    onSelect,
    onEditOption,
    onDeleteOption,
  })

  const renderOptions = () => {
    if (state.selectOptions.length === 0) {
      return (
        <View style={styles.optionsContainer}>
          <Text style={styles.emptyText}>No hay opciones disponibles</Text>
        </View>
      )
    }

    return (
      <View style={styles.optionsContainer}>
        <AddNewHeader />
        <FlatList
          data={state.selectOptions}
          renderItem={({ item }) => (
            <OptionComponent
              label={item.label}
              onPress={() => actions.handleOptionSelect(item)}
              editable={editable}
              onEdit={(newLabel) => actions.handleEditOption(item.id, newLabel)}
              onDelete={() => actions.handleDeleteOption(item)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[
          styles.optionContainer,
          state.isOpen && {
            borderBottomEndRadius: 0,
            borderBottomStartRadius: 0,
          },
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

      {state.isOpen && <View>{renderOptions()}</View>}

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
