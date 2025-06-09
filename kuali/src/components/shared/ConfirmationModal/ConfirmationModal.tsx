import React from 'react'
import { Modal, View, Text, TouchableOpacity } from 'react-native'
import styles from './ConfirmationModal.styles'
import colors from '../../../constants/colors'
import Button from '../Button/Button'

interface Props {
  visible: boolean
  title?: string
  description?: string
  confirmButtonText?: string
  confirmButtonColor?: string
  showWarning?: boolean
  variant?: 'delete' | 'primary'
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmationModal({
  visible,
  title = '¿Estás seguro?',
  description,
  variant = 'primary',
  confirmButtonText = 'Confirmar',
  confirmButtonColor = colors.selectionBlue,
  showWarning = false,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal transparent visible={visible} animationType='fade'>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
          {showWarning && (
            <Text style={styles.warningText}>
              ESTA ACCIÓN NO SE PUEDE DESHACER
            </Text>
          )}
          <View style={styles.buttons}>
            <View>
              <Button
                buttonText='Cancelar'
                variant='cancel'
                onPress={onCancel}
              />
            </View>
            <View>
              <Button
                buttonText={confirmButtonText}
                variant={variant}
                onPress={onConfirm}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}
