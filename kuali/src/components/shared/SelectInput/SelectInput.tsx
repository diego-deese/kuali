import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../constants/colors'
import { ArrowDownIcon, RightArrowIcon } from '../Icons/Icons'
import IconButton from '../IconButton/IconButton'
import Option from './Option/Option'
import AddNewHeader from './AddNewHeader/AddNewHeader'

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
  onSelect?: (option: { id: number | string; label: string }) => void
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
  onSelect,
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
          icon={
            unfolded ? (
              <ArrowDownIcon size={28} />
            ) : (
              <RightArrowIcon size={28} />
            )
          }
          onPress={() => setUnfolded(!unfolded)}
        />
      </View>
      {/* SelectInput options */}
      {unfolded && (
        <View style={styles.optionsContainer}>
          <AddNewHeader />
          {options.map((item) => (
            <Option
              key={item.id.toString()}
              label={item.label}
              onPress={() => {
                setSelectedOption(item)
                setUnfolded(false)
                onSelect?.(item)
              }}
              editable={canEditOptions}
              onEdit={(newLabel) => {
                if (onEditOption) {
                  onEditOption(item.id, newLabel)
                }
              }}
              onDelete={() => {
                if (onDeleteOption) {
                  onDeleteOption(item.id)
                }
              }}
            />
          ))}
        </View>
      )}
    </View>
  )
}

export default SelectInput

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    position: 'relative', // Asegura que los elementos absolutos se posicionen relativos a este contenedor
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
    maxHeight: 210, // Limita la altura máxima del contenedor
    overflow: 'hidden', // Asegura que el contenido no se desborde
  },
  absoluteOptionsContainer: {
    position: 'absolute', // Posiciona el FlatList de manera absoluta
    top: 71, // Ajusta según sea necesario para que no se superponga con el encabezado
    left: 0,
    right: 0,
    zIndex: 10, // Asegura que el FlatList esté encima de otros elementos
    backgroundColor: colors.solidWhite, // Fondo blanco para que las opciones sean visibles
    borderWidth: 1.5,
    borderColor: colors.borderGray,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
  },
  selectedOption: {
    fontFamily: 'monserratRegular',
    fontSize: 16,
    includeFontPadding: false,
    color: colors.standardGray,
  },
})
