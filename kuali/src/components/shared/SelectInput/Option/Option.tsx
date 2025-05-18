import React, { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

import IconButton from '../../IconButton/IconButton'
import colors from '../../../../constants/colors'
import { styles } from './styles'

import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '../../Icons/Icons'

import { OptionProps } from '../interfaces'

const Option: React.FC<OptionProps> = ({
  label = 'Option',
  onPress,
  editable = false,
  onEdit,
  onDelete,
}) => {
  const [isEditting, setIsEditting] = useState(false)
  const [inputValue, setInputValue] = useState(label)

  const handleSave = () => {
    if (onEdit) {
      if (inputValue !== label) {
        onEdit(inputValue)
      }
    }
    setIsEditting(false)
  }

  const handleCancel = () => {
    setInputValue(label)
    setIsEditting(false)
  }

  return (
    <View style={styles.optionContainer}>
      <Pressable style={styles.labelContainer} onPress={onPress}>
        <View>
          {isEditting ? (
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
            />
          ) : (
            <Text style={styles.label}>{inputValue}</Text>
          )}
        </View>
      </Pressable>
      {editable && (
        <View style={styles.iconsContainer}>
          {isEditting ? (
            <>
              <IconButton
                icon={<CheckIcon color={colors.selectionBlue} size={30} />}
                onPress={handleSave}
              />
              <IconButton
                icon={<CloseIcon color={colors.warningRed} size={30} />}
                onPress={handleCancel}
              />
            </>
          ) : (
            <>
              <IconButton
                icon={<EditIcon size={28} />}
                onPress={() => setIsEditting(true)}
              />
              <IconButton
                icon={<DeleteIcon color={colors.warningRed} size={30} />}
                onPress={onDelete}
              />
            </>
          )}
        </View>
      )}
    </View>
  )
}

export default Option
