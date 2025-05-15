import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React from 'react'
import colors from '../../../../constants/colors'
import InputText from '../../../shared/InputText/InputText'
import Switch from '../../../shared/Switch/Switch'
import Button from '../../../shared/Button/Button'
import { UploadIcon } from '../../../shared/Icons/Icons'
import * as DocumentPicker from 'expo-document-picker'
import { useNewRequirementModal } from './useNewRequirementModal'
import { ActivityRequirement } from '../../../../types/Requirements'

interface NewRequirementModalProps {
  requirementInfo?: ActivityRequirement
  visible: boolean
  onConfirm: (name: string, description: string) => void
  onCancel: () => void
}

const NewRequirementModal = ({
  requirementInfo,
  visible,
  onConfirm,
  onCancel,
}: NewRequirementModalProps) => {
  const {
    errors,
    requirementName,
    requirementDescription,
    withTemplate,
    handleCancel,
    handleConfirm,
  } = useNewRequirementModal(requirementInfo)

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
        console.log(result)
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
            value={requirementName.requirementName}
            onChangeText={requirementName.handleNameChange}
          />
          <InputText
            label='Descripción'
            placeholder='Descripción del requisito'
            multiline
            error={errors.description.error}
            errorMessage={errors.description.errorMessage}
            value={requirementDescription.requirementDescription}
            onChangeText={requirementDescription.handleDescriptionChange}
          />
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>¿Requiere plantilla?</Text>
            <Switch
              enabled={withTemplate.withTemplate}
              onChange={withTemplate.handleWithTemplateChange}
            />
          </View>
          {withTemplate.withTemplate && (
            <>
              <Button
                buttonText='Subir documento'
                icon={<UploadIcon color={colors.solidWhite} />}
                onPress={pickDocument}
              />
              <Text style={styles.uploadButtonLabel}>pdf / docx</Text>
            </>
          )}
          <View
            style={[styles.buttonsContainer, withTemplate && { marginTop: 16 }]}
          >
            <Button
              buttonText='Cancelar'
              onPress={() => {
                handleCancel()
                onCancel()
              }}
              variant='cancel'
            />
            <Button
              buttonText='Agregar'
              onPress={() => {
                const canAdd = handleConfirm()

                if (canAdd) {
                  onConfirm(
                    requirementName.requirementName,
                    requirementDescription.requirementDescription,
                  )
                }
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default NewRequirementModal

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
  uploadButtonLabel: {
    fontFamily: 'monserratRegular',
    marginStart: 8,
    marginTop: 4,
  },
})
