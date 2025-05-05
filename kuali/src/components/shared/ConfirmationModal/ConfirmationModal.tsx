import React from 'react'
import { Modal, View, Text, TouchableOpacity } from 'react-native'
import styles from './ConfirmationModal.styles'
import colors from '../../../constants/colors'

interface Props {
  visible: boolean
  title?: string
  description?: string
  confirmButtonText?: string
  confirmButtonColor?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmationModal({
  visible,
  title = '¿Estás seguro?',
  description,
  confirmButtonText = 'Confirmar',
  confirmButtonColor = colors.selectionBlue,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal transparent visible={visible} animationType='fade'>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
          <View style={styles.buttons}>
            <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              style={{
                ...styles.confirmButton,
                backgroundColor: confirmButtonColor,
              }}
            >
              <Text style={styles.confirmText}>{confirmButtonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
