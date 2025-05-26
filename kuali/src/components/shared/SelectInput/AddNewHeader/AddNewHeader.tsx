import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'

import IconButton from '../../IconButton/IconButton'
import colors from '../../../../constants/colors'
import { styles } from './styles'

import { CheckIcon, CloseIcon, PlusBoxIcon } from '../../Icons/Icons'
import Toast from 'react-native-toast-message'

interface AddNewHeaderProps {
  value?: string
  inputTextPlaceholder?: string
  onAddConfirm?: (newOption: string) => void
}

const AddNewHeader: React.FC<AddNewHeaderProps> = ({
  onAddConfirm,
  value = '',
  inputTextPlaceholder = 'Nueva opción',
}) => {
  const [isAdding, setIsAdding] = useState(false)
  const [newOptionValue, setNewOptionValue] = useState(value)

  const handleAddConfirm = (newOption: string) => {
    if (newOption.length === 0 || !newOption) {
      Toast.show({
        type: 'error',
        text1: 'Error al añadir una nueva opción',
        text2: 'La opción no puede estar vacía.',
      })
      return
    }

    if (onAddConfirm) {
      onAddConfirm(newOption)
      setIsAdding(false)
      setNewOptionValue('')
    }
  }

  return (
    <View style={styles.container}>
      {isAdding ? (
        <>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newOptionValue}
              placeholder={inputTextPlaceholder}
              onChangeText={setNewOptionValue}
              onSubmitEditing={() => handleAddConfirm(newOptionValue)}
              autoFocus
            />
          </View>
          <IconButton
            icon={<CheckIcon color={colors.selectionBlue} size={30} />}
            onPress={() => handleAddConfirm(newOptionValue)}
          />
          <IconButton
            icon={<CloseIcon color={colors.warningRed} size={30} />}
            onPress={() => setIsAdding(false)}
          />
        </>
      ) : (
        <>
          <Text style={styles.title}>Añadir nuevo...</Text>
          <IconButton
            icon={<PlusBoxIcon color={colors.selectionBlue} size={30} />}
            onPress={() => setIsAdding(true)}
          />
        </>
      )}
    </View>
  )
}

export default AddNewHeader
