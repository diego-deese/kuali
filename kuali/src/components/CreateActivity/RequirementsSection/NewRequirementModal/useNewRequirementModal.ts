import { useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import { ActivityRequirement } from '../../../../types/Requirements'

export const useNewRequirementModal = (
  requirementInfo: ActivityRequirement,
) => {
  const [withTemplate, setWithTemplate] = useState(
    requirementInfo ? requirementInfo.template !== null : false,
  )

  const initialRequirement: ActivityRequirement = {
    name: '',
    description: '',
    template: null,
    ...requirementInfo,
  }

  const [requirement, setRequirement] =
    useState<ActivityRequirement>(initialRequirement)

  const [actionMade, setActionMade] = useState(false)

  const [errors, setErrors] = useState({
    name: {
      error: false,
      errorMessage: '',
    },
    description: {
      error: false,
      errorMessage: '',
    },
    template: {
      error: false,
      errorMessage: '',
    },
  })

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/msword',
        ],
        copyToCacheDirectory: true,
      })

      if (!result.canceled) {
        setRequirement((prevRequirement) => ({
          ...prevRequirement,
          template: {
            requirement_template_id: 0,
            template_uri: result.assets[0].uri,
          },
        }))
        setErrors((prev) => ({
          ...prev,
          template: {
            error: false,
            errorMessage: '',
          },
        }))
      } else {
        setRequirement((prevRequirement) => ({
          ...prevRequirement,
          template: null,
        }))
        setErrors((prev) => ({
          ...prev,
          template: {
            error: true,
            errorMessage: 'El documento para la plantilla es requerido',
          },
        }))
      }

      setActionMade(true)
    } catch (error) {
      console.error('Error al seleccionar el archivo:', error)
    }
  }

  const handleNameChange = (name: string) => {
    setRequirement((prevRequirement) => ({
      ...prevRequirement,
      name,
    }))
    setErrors((prev) => ({
      ...prev,
      name: validateName(name),
    }))
    setActionMade(true)
  }

  const handleDescriptionChange = (description: string) => {
    setRequirement((prevRequirement) => ({
      ...prevRequirement,
      description,
    }))
    setErrors((prev) => ({
      ...prev,
      description: validateDescription(description),
    }))
    setActionMade(true)
  }

  const handleWithTemplateChange = () => {
    setWithTemplate(!withTemplate)
    setRequirement((prevRequirement) => ({
      ...prevRequirement,
      template: null,
    }))
    setActionMade(true)
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

  const validateTemplate = () => {
    if (withTemplate && requirement.template === null) {
      return {
        error: true,
        errorMessage: 'No se proporcionó el archivo de plantilla',
      }
    }

    return {
      error: false,
      errorMessage: '',
    }
  }

  const validateFields = (): boolean => {
    const newErrors = {
      name: validateName(requirement.name),
      description: validateDescription(requirement.description),
      template: validateTemplate(),
    }

    setErrors(newErrors)

    return !(
      newErrors.name.error ||
      newErrors.description.error ||
      newErrors.template.error
    )
  }

  const resetFields = (): void => {
    setRequirement((prevRequirement) => ({
      ...prevRequirement,
      name: '',
      description: '',
      template: null,
    }))
    setWithTemplate(false)
  }

  const resetErrors = (): void => {
    setErrors({
      name: {
        error: false,
        errorMessage: '',
      },
      description: {
        error: false,
        errorMessage: '',
      },
      template: {
        error: false,
        errorMessage: '',
      },
    })
  }

  const handleConfirm = (): boolean => {
    const correctInputs = validateFields()

    if (correctInputs) {
      if (!requirementInfo) {
        resetFields()
        resetErrors()
      }
    }

    return correctInputs
  }

  const handleCancel = () => {
    resetErrors()

    if (!requirementInfo) {
      resetFields()
    }
  }

  return {
    requirement: {
      requirement,
      withTemplate,
      handleNameChange,
      handleDescriptionChange,
      handleWithTemplateChange,
    },
    errors,
    handleCancel,
    handleConfirm,
    pickDocument,
    actionMade,
  }
}
