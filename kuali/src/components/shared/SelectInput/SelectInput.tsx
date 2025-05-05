import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import AddNewHeader from './AddNewHeader/AddNewHeader'
import IconButton from '../IconButton/IconButton'
import OptionComponent from './Option/Option'

import colors from '../../../constants/colors'
import { ArrowDownIcon, RightArrowIcon } from '../Icons/Icons'

interface Option {
  id: string | number
  label: string
}

interface SelectInputProps {
  label?: string
  placeholder?: string
  options?: Option[]
  editable?: boolean
  onEditOption?: (id: string | number, newLabel: string) => void
  onDeleteOption?: (id: string | number) => void
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
  onDeleteOption,
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
          <FlatList
            data={options}
            renderItem={({ item }) => (
              <OptionComponent
                label={item.label}
                onPress={() => {
                  setSelectedOption(item)
                  setUnfolded(false)
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
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
    </View>
  )
}

export default SelectInput

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    position: 'relative',
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
    position: 'absolute',
    width: '100%',
    top: 73,
    zIndex: 10,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderColor: colors.borderGray,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    padding: 2,
    backgroundColor: colors.solidWhite,
    maxHeight: 210,
    overflow: 'hidden',
  },
  selectedOption: {
    fontFamily: 'monserratRegular',
    fontSize: 16,
    includeFontPadding: false,
    color: colors.standardGray,
  },
})
