import { useState } from 'react'
import { Option, UseSelectInputProps } from './interfaces'
import { useEffect } from 'react'

export const useSelectInput = ({
  value = null,
  onSelect,
  onDeleteOption,
  onAddOption,
}: UseSelectInputProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    value || null,
  )
  const [optionToDelete, setOptionToDelete] = useState<Option | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option)
    setIsOpen(false)
    if (onSelect) {
      onSelect(option)
    }
  }

  const handleDeleteOption = (option: Option) => {
    setOptionToDelete(option)
    setIsModalVisible(true)
  }

  const handleConfirmDeleteOption = (id: number) => {
    if (onDeleteOption) {
      onDeleteOption(id)
    }
    setIsModalVisible(false)
    setSelectedOption(null)
  }

  const handleAddOption = async (label: string) => {
    if (onAddOption) {
      const newOption = await onAddOption(label)

      if (newOption) {
        if (onSelect) {
          onSelect(newOption)
        }
        handleOptionSelect(newOption)
      }
    }
  }

  useEffect(() => {
    setSelectedOption(value || null)
  }, [value])

  return {
    state: {
      isOpen,
      selectedOption,
      optionToDelete,
      isModalVisible,
    },
    actions: {
      setIsOpen,
      setIsModalVisible,
      handleOptionSelect,
      handleDeleteOption,
      handleConfirmDeleteOption,
      handleAddOption,
    },
  }
}
