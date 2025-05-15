import { useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import { ActivityRequirement } from '../../../../types/Requirements'

export const useNewRequirementModal = (
  requirementInfo: ActivityRequirement,
) => {
  const [withTemplate, setWithTemplate] = useState(false)
  const [requirementName, setRequirementName] = useState(
    requirementInfo ? requirementInfo.name : '',
  )
  const [requirementDescription, setRequirementDescription] = useState(
    requirementInfo ? requirementInfo.description : '',
  )
  const [selectedFile, setSelectedFile] =
    useState<DocumentPicker.DocumentPickerResult | null>(null)
  const [errors, setErrors] = useState({
    name: {
      error: false,
      errorMessage: '',
    },
    description: {
      error: false,
      errorMessage: '',
    },
  })

  const handleNameChange = (text: string) => {
    setRequirementName(text)
    setErrors((prev) => ({
      ...prev,
      name: validateName(text),
    }))
  }

  const handleDescriptionChange = (text: string) => {
    setRequirementDescription(text)
    setErrors((prev) => ({
      ...prev,
      description: validateName(text),
    }))
  }

  const handleWithTemplateChange = () => {
    setWithTemplate(!withTemplate)
  }

  const validateName = (name: string) => {
    if (name === '' || !name) {
      return {
        error: true,
        errorMessage: 'El nombre es requerido',
      }
    }

    const letterRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
    if (!letterRegex.test(name)) {
      return {
        error: true,
        errorMessage: 'Solo se permiten letras',
      }
    }

    return {
      error: false,
      errorMessage: '',
    }
  }

  const validateDescription = (description: string) => {
    if (description === '' || !description) {
      return {
        error: true,
        errorMessage: 'La descripción es requerida',
      }
    }

    if (description.length > 100) {
      return {
        error: true,
        errorMessage: `La descripción es demasiado larga (${description.length}/100)`,
      }
    }

    return {
      error: false,
      errorMessage: '',
    }
  }

  const validateFields = (): boolean => {
    const newErrors = {
      name: validateName(requirementName),
      description: validateDescription(requirementDescription),
    }

    setErrors(newErrors)

    return !(newErrors.name.error || newErrors.description.error)
  }

  const handleConfirm = (): boolean => {
    const correctInputs = validateFields()

    if (correctInputs) {
      console.log('inputs correctos')
      setErrors({
        name: {
          error: false,
          errorMessage: '',
        },
        description: {
          error: false,
          errorMessage: '',
        },
      })

      if (!requirementInfo) {
        setRequirementName('')
        setRequirementDescription('')
      }
    }

    return correctInputs
  }

  const handleCancel = () => {
    setErrors({
      name: {
        error: false,
        errorMessage: '',
      },
      description: {
        error: false,
        errorMessage: '',
      },
    })

    if (!requirementInfo) {
      setRequirementName('')
      setRequirementDescription('')
    }
  }

  return {
    requirementName: {
      requirementName,
      handleNameChange,
    },
    requirementDescription: {
      requirementDescription,
      handleDescriptionChange,
    },
    withTemplate: {
      withTemplate,
      handleWithTemplateChange,
    },
    errors,
    handleCancel,
    handleConfirm,
  }
}
