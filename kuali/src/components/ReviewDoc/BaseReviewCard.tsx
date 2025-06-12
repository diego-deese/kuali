import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import styles from './styles'
import Button from '../shared/Button/Button'
import { DownloadIcon } from '../shared/Icons/Icons'
import userDocumentService from '../../services/user-document.service'
import ConfirmationModal from '../shared/ConfirmationModal/ConfirmationModal'
import { useDownloadDocument } from '../../hooks/ReviewDocs/useDownloadDoc'

type Props = {
  title: string
  user_document_id: number
  initialStatus?: string
  fileName?: string
  onActionComplete?: () => void
}

export default function BaseReviewCard({
  title,
  user_document_id,
  initialStatus,
  fileName,
  onActionComplete,
}: Props) {
  // Status to save the current status of the document (approved, rejected, or undefined)
  const [status, setStatus] = useState(initialStatus)
  // Controls whether the confirmation modal is visible
  const [modalVisible, setModalVisible] = useState(false)
  // Defines the action you want to confirm: 'approved', 'rejected' or null
  const [action, setAction] = useState<'approved' | 'rejected' | null>(null)
  // Custom hook to handle document download
  const { downloadDocument } = useDownloadDocument()

  // Handles the logic when pressing the "Approved" button
  const handleApprove = () => {
    setAction('approved')
    setModalVisible(true)
  }
  // Handles the logic when pressing the "Reject" button
  const handleReject = () => {
    setAction('rejected')
    setModalVisible(true)
  }

  const handleDownload = () => {
    const finalFileName = fileName || `${title}_${user_document_id}`
    downloadDocument(user_document_id, finalFileName)
  }
  // Confirm the selected action (approve or reject)
  const confirmAction = async () => {
    if (!action) return // Do nothing if no action is defined
    try {
      if (action === 'approved') {
        await userDocumentService.approveUserDocument(user_document_id)
        setStatus('Aprobado')
      } else {
        // Call the service to approve the document
        await userDocumentService.rejectUserDocument(user_document_id)
        setStatus('Rechazado')
      }
      onActionComplete?.()
    } catch (err) {
      console.error('Error actualizando estado', err)
    } finally {
      // Calls the callback function if it was provided
      setModalVisible(false)
      setAction(null)
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name} numberOfLines={2} ellipsizeMode='tail'>
          {title}
        </Text>

        <Pressable onPress={handleDownload} style={styles.iconContainer}>
          <DownloadIcon color='#2C4A90' />
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
        confirmButtonText={action === 'approved' ? 'Aprobar' : 'Rechazar'}
        confirmButtonColor={action === 'approved' ? '#2A4A91' : '#D32F2F'}
        variant={action === 'approved' ? 'primary' : 'delete'}
        onConfirm={confirmAction}
        onCancel={() => {
          setModalVisible(false)
          setAction(null)
        }}
      />
    </View>
  )
}
