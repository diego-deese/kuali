import { useEffect, useState } from 'react'
import { Option, UseSelectInputProps } from './interfaces'

export const useSelectInput = ({
  options,
  value = null,
  onSelect,
  onEditOption,
  onDeleteOption,
}: UseSelectInputProps) => {
  const [selectOptions, setSelectOptions] = useState<Option[]>(options)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    value || null,
  )
  const [optionToDelete, setOptionToDelete] = useState<Option | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    setSelectOptions(options)
  }, [options])

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option)
    setIsOpen(false)
    if (onSelect) {
      onSelect(option)
    }
  }

  const handleEditOption = (id: number, newLabel: string) => {
    // Edit the label of the selected option
    setSelectOptions((prevOptions) =>
      prevOptions.map((option) => {
        return option.id === id ? { ...option, label: newLabel } : option
      }),
    )
    if (onEditOption) {
      onEditOption(id, newLabel)
    }
  }

  const handleDeleteOption = (option: Option) => {
    setOptionToDelete(option)
    setIsModalVisible(true)
  }

  const handleConfirmDeleteOption = (id: number) => {
    // Delete the selected option
    setSelectOptions((prevOptions) =>
      prevOptions.filter((option) => option.id !== id),
    )
    if (onDeleteOption) {
      onDeleteOption(id)
    }
    setIsModalVisible(false)
  }

  return {
    state: {
      selectOptions,
      isOpen,
      selectedOption,
      optionToDelete,
      isModalVisible,
    },
    actions: {
      setIsOpen,
      setIsModalVisible,
      handleOptionSelect,
      handleEditOption,
      handleDeleteOption,
      handleConfirmDeleteOption,
    },
  }
}
