import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native'

import AddNewHeader from './AddNewHeader/AddNewHeader'
import IconButton from '../IconButton/IconButton'
import OptionComponent from './Option/Option'

import colors from '../../../constants/colors'
import { ArrowDownIcon, RightArrowIcon } from '../Icons/Icons'

interface Option {
  id: number
  label: string
}

interface SelectInputProps {
  label?: string
  placeholder?: string
  options?: Option[]
  editable?: boolean
  onEditOption?: (id: string | number, newLabel: string) => void
  onDeleteOption?: (id: string | number) => void
  onSelect?: (option: Option) => void
  value?: Option | null
}

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
  const [canEditOptions, setCanEditOptions] = useState(editable)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    value || null,
  )

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option)
    setIsOpen(false)
    if (onSelect) {
      onSelect(option)
    }
  }

  const handleOptionEdit = (id: number, newLabel: string) => {
    if (onEditOption) {
      onEditOption(id, newLabel)
    }
  }

  const handleOptionDelete = (id: number) => {
    if (onDeleteOption) {
      onDeleteOption(id)
    }
  }

  const renderOptions = () => {
    return (
      <View style={styles.optionsContainer}>
        <AddNewHeader />
        <FlatList
          data={options}
          renderItem={({ item }) => (
            <OptionComponent
              label={item.label}
              onPress={() => handleOptionSelect(item)}
              editable={canEditOptions}
              onEdit={(newLabel) => handleOptionEdit(item.id, newLabel)}
              onDelete={() => handleOptionDelete(item.id)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          nestedScrollEnabled={true}
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
          isOpen && { borderBottomEndRadius: 0, borderBottomStartRadius: 0 },
        ]}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.selectedOption,
            selectedOption ? { color: colors.fontBlack } : {},
          ]}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <IconButton
          icon={
            isOpen ? <ArrowDownIcon size={28} /> : <RightArrowIcon size={28} />
          }
          onPress={() => setIsOpen(!isOpen)}
        />
      </TouchableOpacity>

      {isOpen && <View>{renderOptions()}</View>}
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
