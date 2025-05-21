import { useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import { ActivityRequirement } from '../../../../types/Requirements'

export const useNewRequirementModal = (
  requirementInfo: ActivityRequirement,
) => {
  const [withTemplate, setWithTemplate] = useState(
    requirementInfo ? requirementInfo.template_uri !== null : false,
  )
  const [requirementName, setRequirementName] = useState(
    requirementInfo ? requirementInfo.name : '',
  )
  const [requirementDescription, setRequirementDescription] = useState(
    requirementInfo ? requirementInfo.description : '',
  )
  const [templateUri, setTemplateUri] = useState<string | null>(
    requirementInfo ? requirementInfo.template_uri : null,
  )

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
        setTemplateUri(result.assets[0].uri)
        setErrors((prev) => ({
          ...prev,
          template: {
            error: false,
            errorMessage: '',
          },
        }))
      }
    } catch (error) {
      console.error('Error al seleccionar el archivo:', error)
    }
  }

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
    setTemplateUri(null)
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
    if (withTemplate && templateUri === null) {
      console.log('URI incorrecta')
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
      name: validateName(requirementName),
      description: validateDescription(requirementDescription),
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
    setRequirementName('')
    setRequirementDescription('')
    setWithTemplate(false)
    setTemplateUri(null)
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
      requirementName,
      handleNameChange,
      requirementDescription,
      handleDescriptionChange,
      templateUri,
      withTemplate,
      handleWithTemplateChange,
    },
    errors,
    handleCancel,
    handleConfirm,
    pickDocument,
  }
}
