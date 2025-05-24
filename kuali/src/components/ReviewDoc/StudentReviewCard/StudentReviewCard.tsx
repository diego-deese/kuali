import React, { useState } from 'react'
import { Pressable, View, Text } from 'react-native'
import styles from './styles'
import Button from '../../shared/Button/Button'
import { DownloadIcon } from '../../shared/Icons/Icons'
import userDocumentService from '../../../services/user-document.service'
import ConfirmationModal from '../../shared/ConfirmationModal/ConfirmationModal'

export default function StudentReviewCard({ student, onActionComplete }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [action, setAction] = useState<'approved' | 'rejected' | null>(null)
  const [statusName, setStatusName] = useState(student.documentStatus?.name)
  console.log('student recibido:', student)
  const handleDownload = () => {
    console.log('Descargando...')
  }
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
      console.log('ID que se va a aprobar/rechazar:', student.user_document_id)
      if (action === 'approved') {
        await userDocumentService.approveUserDocument(student.user_document_id)
        setStatusName('Aprobado')
      } else {
        await userDocumentService.rejectUserDocument(student.user_document_id)
        setStatusName('Rechazado')
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
        <Text style={styles.name}>
          {student.name} {student.second_name} {student.paternal_lastname}
        </Text>
        <Pressable onPress={handleDownload}>
          <DownloadIcon name='download' />
        </Pressable>
        {statusName === 'Aprobado' ? (
          <Text style={styles.approved}>Aprobado</Text>
        ) : statusName === 'Rechazado' ? (
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
      {/* Modal de confirmación */}
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
