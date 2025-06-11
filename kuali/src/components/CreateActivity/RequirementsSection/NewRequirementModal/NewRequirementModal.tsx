import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useRef } from 'react'
import colors from '../../../../constants/colors'
import InputText from '../../../shared/InputText/InputText'
import Switch from '../../../shared/Switch/Switch'
import Button from '../../../shared/Button/Button'
import { UploadIcon } from '../../../shared/Icons/Icons'
import { useNewRequirementModal } from './useNewRequirementModal'
import {
  ActivityRequirement,
  EditRequirement,
} from '../../../../types/Requirements'

interface NewRequirementModalProps {
  requirementInfo?: ActivityRequirement
  visible: boolean
  onConfirm: (requirementInfo: EditRequirement) => void
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
    requirement,
    handleCancel,
    handleConfirm,
    pickDocument,
    actionMade,
  } = useNewRequirementModal(requirementInfo)

  const descriptionRef = useRef(null)

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
            value={requirement.requirement?.name}
            onChangeText={requirement.handleNameChange}
            onSubmitEditing={() => descriptionRef.current?.focus()}
          />
          <InputText
            label='Descripción'
            placeholder='Descripción del requisito'
            inputRef={descriptionRef}
            multiline
            error={errors.description.error}
            errorMessage={errors.description.errorMessage}
            value={requirement.requirement?.description}
            onChangeText={requirement.handleDescriptionChange}
          />
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>¿Requiere plantilla?</Text>
            <Switch
              enabled={requirement.withTemplate}
              onChange={requirement.handleWithTemplateChange}
            />
          </View>
          {requirement.withTemplate && (
            <>
              <View>
                <Button
                  buttonText='Subir documento'
                  icon={<UploadIcon color={colors.solidWhite} />}
                  onPress={pickDocument}
                />
              </View>
              <View style={styles.uploadButtonLabelsContainer}>
                <Text
                  style={[
                    styles.uploadButtonLabel,
                    errors.template.error && { color: colors.warningRed },
                  ]}
                >
                  {errors.template.error
                    ? errors.template.errorMessage
                    : 'pdf / docx'}
                </Text>
                {requirement.requirement.template !== null && (
                  <Text
                    style={[
                      styles.uploadButtonLabel,
                      { color: colors.highlightCyan },
                    ]}
                  >
                    Plantilla subida
                  </Text>
                )}
              </View>
            </>
          )}
          <View
            style={[
              styles.buttonsContainer,
              requirement.withTemplate && { marginTop: 16 },
            ]}
          >
            <View>
              <Button
                buttonText='Cancelar'
                onPress={() => {
                  handleCancel()
                  onCancel()
                }}
                variant='cancel'
              />
            </View>
            <View>
              <Button
                disabled={!actionMade}
                buttonText={
                  requirementInfo !== undefined ? 'Aceptar' : 'Agregar'
                }
                onPress={() => {
                  const canAdd = handleConfirm()

                  if (canAdd) {
                    onConfirm(requirement.requirement)
                  }
                }}
              />
            </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingStart: 8,
    marginBottom: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    gap: 8,
  },
  uploadButtonLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'monserratBold',
    fontSize: 24,
    marginBottom: 16,
  },
  switchLabel: {
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: colors.borderGray,
    borderColor: colors.inactiveGray,
    borderWidth: 1.5,
  },
  uploadButtonLabel: {
    fontFamily: 'monserratItalic',
    marginHorizontal: 8,
    marginTop: 4,
  },
})
