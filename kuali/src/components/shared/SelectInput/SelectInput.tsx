import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../constants/colors'
import { ArrowDownIcon, RightArrowIcon } from '../Icons/Icons'
import IconButton from '../IconButton/IconButton'
import Option from './Option/Option'

interface Option {
  id: string | number
  label: string
}

interface SelectInputProps {
  label?: string
  placeholder?: string
  options?: Option[]
  editable?: boolean
  onEditOption?: (id: string | number, newLabel: string) => void // Nueva prop para manejar la edición de opciones
  onDeleteOption?: (id: string | number) => void // Nueva prop para manejar la eliminación de opciones
}

const getStyle = (unfolded: boolean) => {
  if (unfolded) {
    return {
      borderBottomEndRadius: 0,
      borderBottomStartRadius: 0,
      ...styles.optionContainer,
    }
  } else {
    return styles.optionContainer
  }
}

const SelectInput = ({
  label,
  placeholder = 'Selecciona una opción',
  options = [],
  editable = false,
  onEditOption,
  onDeleteOption, // Nueva prop para manejar la eliminación de opciones
}: SelectInputProps) => {
  const [canEditOptions, setCanEditOptions] = useState(editable)
  const [unfolded, setUnfolded] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={getStyle(unfolded)}>
        <Text style={styles.selectedOption}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <IconButton
          icon={unfolded ? <ArrowDownIcon /> : <RightArrowIcon />}
          onPress={() => setUnfolded(!unfolded)}
        />
      </View>
      {/* SelectInput options */}
      {unfolded && (
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <Option
              key={option.id}
              label={option.label}
              onPress={() => {
                setSelectedOption(option)
                setUnfolded(false)
              }}
              editable={canEditOptions}
              onEdit={(newLabel) => {
                if (onEditOption) {
                  onEditOption(option.id, newLabel) // Llama a la función onEditOption cuando se edite una opción
                }
              }}
              onDelete={() => {
                if (onDeleteOption) {
                  onDeleteOption(option.id) // Llama a la función onDeleteOption cuando se elimine una opción
                }
              }}
            />
          ))}
          <View></View>
        </View>
      )}
    </View>
  )
}

export default SelectInput

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 8,
    marginBottom: 8,
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
    fontSize: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    height: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.solidWhite,
    borderWidth: 1.5,
    borderColor: colors.borderGray,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  optionsContainer: {
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderColor: colors.borderGray,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    padding: 2,
    backgroundColor: colors.solidWhite,
  },
  selectedOption: {
    fontFamily: 'monserratRegular',
    fontSize: 16,
    includeFontPadding: false,
    color: colors.standardGray,
  },
})
