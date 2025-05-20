import React from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native'

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

      <Modal transparent animationType='fade' visible={state.isOpen}>
        <Pressable
          style={styles.optionsOverlay}
          onPress={() => actions.setIsOpen(false)}
        >
          <View style={styles.optionsContainer}>
            {editable && (
              <AddNewHeader
                inputTextPlaceholder={headerInputPlaceholder}
                onAddConfirm={actions.handleAddOption}
              />
            )}
            <ScrollView>
              {options.map((option) => (
                <OptionComponent
                  label={option.label}
                  onPress={() => actions.handleOptionSelect(option)}
                  editable={editable}
                  onEdit={(newLabel) => onEditOption(option.id, newLabel)}
                  onDelete={() => actions.handleDeleteOption(option)}
                  key={option.id}
                />
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>

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
