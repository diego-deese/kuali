import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useState } from 'react'
import colors from '../../../../constants/colors'
import InputText from '../../../shared/InputText/InputText'
import Switch from '../../../shared/Switch/Switch'
import Button from '../../../shared/Button/Button'
import { UploadIcon } from '../../../shared/Icons/Icons'
import * as DocumentPicker from 'expo-document-picker'

interface NewAttachedFileModalProps {
  visible: boolean
  onConfirm: () => void
  onCancel: () => void
}

const NewAttachedFileModal = ({
  visible,
  onConfirm,
  onCancel,
}: NewAttachedFileModalProps) => {
  const [withTemplate, setWithTemplate] = useState(false)
  const [requirementName, setRequirementName] = useState('')
  const [requirementDescription, setRequirementDescription] = useState('')
  const [selectedFile, setSelectedFile] =
    useState<DocumentPicker.DocumentPickerResult | null>(null)
  const [isUploading, setIsUploading] = useState(false)
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

  const validateFields = () => {
    setErrors({
      name: validateName(requirementName),
      description: validateDescription(requirementDescription),
    })
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
    setRequirementName('')
    setRequirementDescription('')
    onCancel()
  }

  const pickDocument = async () => {
    console.log(pickDocument)
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Permite cualquier tipo de archivo
        copyToCacheDirectory: true,
      })

      if (!result.canceled) {
        setSelectedFile(result)
      }
    } catch (error) {
      console.error('Error al seleccionar el archivo:', error)
    }
  }

  return (
    <Modal transparent visible={visible} animationType='fade'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.background}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Añadir requisito</Text>
          <InputText
            label='Nombre'
            placeholder='Nombre del requisito'
            error={errors.name.error}
            errorMessage={errors.name.errorMessage}
            value={requirementName}
            onChangeText={handleNameChange}
          />
          <InputText
            label='Descripción'
            placeholder='Descripción del requisito'
            multiline
            error={errors.description.error}
            errorMessage={errors.description.errorMessage}
            value={requirementDescription}
            onChangeText={handleDescriptionChange}
          />
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>¿Requiere plantilla?</Text>
            <Switch
              enabled={withTemplate}
              onChange={() => setWithTemplate(!withTemplate)}
            />
          </View>
          {withTemplate && (
            <Button
              buttonText='Subir documento'
              icon={<UploadIcon color={colors.solidWhite} />}
              onPress={pickDocument}
            />
          )}
          <View
            style={[styles.buttonsContainer, withTemplate && { marginTop: 16 }]}
          >
            <Button
              buttonText='Cancelar'
              onPress={handleCancel}
              variant='cancel'
            />
            <Button buttonText='Agregar' onPress={validateFields} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default NewAttachedFileModal

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.backgroundWhite,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    margin: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingStart: 8,
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    gap: 8,
  },
  title: {
    fontFamily: 'monserratBold',
    fontSize: 24,
    marginBottom: 16,
  },
  switchLabel: {
    fontFamily: 'monserratRegular',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: colors.borderGray,
    borderColor: colors.inactiveGray,
    borderWidth: 1.5,
  },
})
