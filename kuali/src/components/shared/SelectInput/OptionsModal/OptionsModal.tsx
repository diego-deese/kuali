import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './styles'
import AddNewHeader from '../AddNewHeader/AddNewHeader'
import { Option } from '../interfaces'
import OptionComponent from '../Option/Option'

interface OptionsModalProps {
  visible: boolean
  editable: boolean
  headerInputPlaceholder: string
  options: Option[]
  onRequestClose: () => void
  handleAddOption: (label: string) => void
  handleOptionSelect: (option: Option) => void
  onEditOption: (id: number, newLabel: string) => void
  handleDeleteOption: (option: Option) => void
}

const OptionsModal: React.FC<OptionsModalProps> = ({
  visible,
  editable,
  headerInputPlaceholder,
  options,
  onRequestClose,
  handleAddOption,
  handleOptionSelect,
  onEditOption,
  handleDeleteOption,
}) => {
  return (
    <Modal
      transparent
      animationType='fade'
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={styles.optionsOverlay}
      >
        <View style={styles.optionsContainer}>
          {editable && (
            <AddNewHeader
              inputTextPlaceholder={headerInputPlaceholder}
              onAddConfirm={handleAddOption}
            />
          )}
          <ScrollView keyboardShouldPersistTaps='handled'>
            {options.map((option) => (
              <OptionComponent
                label={option.label}
                onPress={() => handleOptionSelect(option)}
                editable={editable}
                onEdit={(newLabel) => onEditOption(option.id, newLabel)}
                onDelete={() => handleDeleteOption(option)}
                key={option.id}
              />
            ))}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default OptionsModal
