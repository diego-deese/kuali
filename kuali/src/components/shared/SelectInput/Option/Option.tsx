import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../../constants/colors'
import IconButton from '../../IconButton/IconButton'
import { CheckIcon, DeleteIcon, EditIcon } from '../../Icons/Icons'

interface OptionProps {
  label?: string
  editable?: boolean
  onPress?: () => void
  onEdit?: (newLabel: string) => void // Nueva prop para manejar la edición de la opción
  onDelete?: () => void // Nueva prop para manejar la eliminación de la opción
}

const Option: React.FC<OptionProps> = ({
  label = 'Option',
  onPress,
  editable = false,
  onEdit,
  onDelete, // Agregada la prop onDelete
}) => {
  const [isEditting, setIsEditting] = useState(false)
  const [inputValue, setInputValue] = useState(label)

  const handleSave = () => {
    if (onEdit) {
      onEdit(inputValue) // Llama a la función onEdit cuando se guarda la edición
    }
    setIsEditting(false)
  }

  return (
    <View style={styles.optionContainer}>
      <View style={styles.labelContainer}>
        {isEditting ? (
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
          />
        ) : (
          <Pressable onPress={onPress}>
            <Text style={styles.label}>{inputValue}</Text>
          </Pressable>
        )}
      </View>
      {editable && (
        <View style={styles.iconsContainer}>
          <IconButton
            icon={
              isEditting ? (
                <CheckIcon color={colors.selectionBlue} size={30} />
              ) : (
                <EditIcon size={28} />
              )
            }
            onPress={isEditting ? handleSave : () => setIsEditting(true)}
          />
          <IconButton
            icon={<DeleteIcon color={colors.warningRed} size={30} />}
            onPress={onDelete} // Llama a la función onDelete cuando se presiona el botón de eliminar
          />
        </View>
      )}
    </View>
  )
}

export default Option

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    gap: 4,
    height: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.solidWhite,
    paddingVertical: 8,
    paddingEnd: 8,
  },
  labelContainer: {
    flex: 1,
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  input: {
    height: 40,
    width: 'auto',
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
    fontSize: 16,
    color: colors.fontBlack,
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: 8,
    paddingHorizontal: 4,
    marginHorizontal: 4,
  },
  label: {
    fontFamily: 'monserratRegular',
    fontSize: 16,
    includeFontPadding: false,
    color: colors.fontBlack,
    marginStart: 8,
  },
})
