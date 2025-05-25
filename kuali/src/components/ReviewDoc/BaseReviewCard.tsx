import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import styles from './styles'
import Button from '../shared/Button/Button'
import { DownloadIcon } from '../shared/Icons/Icons'
import userDocumentService from '../../services/user-document.service'
import ConfirmationModal from '../shared/ConfirmationModal/ConfirmationModal'

type Props = {
  title: string
  user_document_id: number
  initialStatus?: string
  onDownload: () => void
  onActionComplete?: () => void
}

export default function BaseReviewCard({
  title,
  user_document_id,
  initialStatus,
  onDownload,
  onActionComplete,
}: Props) {
  const [status, setStatus] = useState(initialStatus)
  const [modalVisible, setModalVisible] = useState(false)
  const [action, setAction] = useState<'approved' | 'rejected' | null>(null)

  const handleApprove = () => {
    setAction('approved')
    setModalVisible(true)
  }

  const handleReject = () => {
    setAction('rejected')
    setModalVisible(true)
  }

  const confirmAction = async () => {
    if (!action) return
    try {
      if (action === 'approved') {
        await userDocumentService.approveUserDocument(user_document_id)
        setStatus('Aprobado')
      } else {
        await userDocumentService.rejectUserDocument(user_document_id)
        setStatus('Rechazado')
      }
      onActionComplete?.()
    } catch (err) {
      console.error('Error actualizando estado', err)
    } finally {
      setModalVisible(false)
      setAction(null)
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{title}</Text>
        <Pressable onPress={onDownload} style={styles.iconContainer}>
          <DownloadIcon />
        </Pressable>
        {status === 'Aprobado' ? (
          <Text style={styles.approved}>Aprobado</Text>
        ) : status === 'Rechazado' ? (
          <Text style={styles.rejected}>Rechazado</Text>
        ) : (
          <View style={styles.actions}>
            <Button
              buttonText='Aprobar'
              variant='primary'
              size='small'
              onPress={handleApprove}
              style={styles.buttonCompact}
            />
            <Button
              buttonText='Rechazar'
              variant='delete'
              size='small'
              onPress={handleReject}
              style={styles.buttonCompact}
            />
          </View>
        )}
      </View>

      <ConfirmationModal
        visible={modalVisible}
        title={`¿${action === 'approved' ? 'Aprobar' : 'Rechazar'} documento?`}
        description={`Esta acción marcará el documento como "${action === 'approved' ? 'Aprobado' : 'Rechazado'}".`}
        confirmButtonText={action === 'approved' ? 'Aprobar' : 'Rechazar'}
        confirmButtonColor={action === 'approved' ? '#2A4A91' : '#D32F2F'}
        onConfirm={confirmAction}
        onCancel={() => {
          setModalVisible(false)
          setAction(null)
        }}
      />
    </View>
  )
}
