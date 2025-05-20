import React from 'react'
import { Pressable, View, Text } from 'react-native'
import { router } from 'expo-router'
import styles from './styles'
import Button from '../../shared/Button/Button'
import { setStudents } from '../../../context/StudentsStored'
import { DownloadIcon } from '../../shared/Icons/Icons'

export default function StudentReviewCard({
  student,
  students,
  onApprove,
  onReject,
}) {
  const handleDownload = () => {
    console.log('Descargando...')
    // Aquí va tu lógica de descarga
  }
  const handlePress = () => {
    // Guardamos todos los estudiantes antes de navegar
    setStudents(students)
    // Navegamos a la vista de documentos de este estudiante
    router.push({
      pathname: '/documents/[id]',
      params: {
        id: student.user_id.toString(),
        index: student.index?.toString() || '0',
      },
    })
  }
  return (
    <Pressable onPress={handlePress}>
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
    </Pressable>
  )
}
