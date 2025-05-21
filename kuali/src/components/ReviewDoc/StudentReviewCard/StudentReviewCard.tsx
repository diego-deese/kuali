import React from 'react'
import { Pressable, View, Text } from 'react-native'
import styles from './styles'
import Button from '../../shared/Button/Button'
import { DownloadIcon } from '../../shared/Icons/Icons'

export default function StudentReviewCard({ student, onApprove, onReject }) {
  const handleDownload = () => {
    console.log('Descargando...')
    // Aquí va tu lógica de descarga
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
        {student.documentStatus === 'approved' ? (
          //Si el documento ya está aprobado, muestra un texto verde que dice "Aprobado"
          <Text style={styles.approved}>Aprobado</Text>
        ) : student.documentStatus === 'rejected' ? (
          //Si ya fue rechazado, muestra "Rechazado"
          <Text style={styles.rejected}>Rechazado</Text>
        ) : (
          <View style={styles.actions}>
            <Button
              buttonText='Aprobar'
              variant='primary'
              size='small'
              onPress={onApprove}
              style={styles.buttonCompact}
            />
            <Button
              buttonText='Rechazar'
              variant='delete'
              size='small'
              onPress={onReject}
              style={styles.buttonCompact}
            />
          </View>
        )}
      </View>
    </View>
  )
}
