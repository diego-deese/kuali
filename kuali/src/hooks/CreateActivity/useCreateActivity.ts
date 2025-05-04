import { useState } from 'react'

export const useCreateActivity = () => {
  const [eventDate, setEventDate] = useState(new Date())
  const [limitDate, setLimitDate] = useState(eventDate)
  const [options, setOptions] = useState([
    { id: 1, label: 'Opcion1' },
    { id: 2, label: 'Opcion2' },
  ])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [optionToDelete, setOptionToDelete] = useState<number | string | null>(
    null,
  )

  const updateOptionLabel = (id: number | string, newLabel: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, label: newLabel } : option,
      ),
    )
  }

  const confirmDeleteOption = () => {
    if (optionToDelete !== null) {
      setOptions((prevOptions) =>
        prevOptions.filter((option) => option.id !== optionToDelete),
      )
      setOptionToDelete(null)
    }
    setIsModalVisible(false)
  }

  const deleteOption = (id: number | string) => {
    setOptionToDelete(id)
    setIsModalVisible(true)
  }

  return {
    eventDate: {
      eventDate,
      setEventDate,
    },
    limitDate: {
      limitDate,
      setLimitDate,
    },
    options: {
      options,
      updateOptionLabel,
      confirmDeleteOption,
      deleteOption,
      optionToDelete,
    },
    modal: {
      isModalVisible,
      setIsModalVisible,
    },
  }
}
