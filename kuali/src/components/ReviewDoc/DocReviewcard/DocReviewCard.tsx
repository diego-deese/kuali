import React from 'react'
import { View, Text, Pressable } from 'react-native'
import styles from './styles'
import Button from '../../shared/Button/Button'
import { DownloadIcon } from '../../shared/Icons/Icons'

export default function DocReviewCard({ req }) {
  const handleDownload = () => {
    console.log('Descargando...')
    // Aquí va tu lógica de descarga
  }
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.docName}>{req.name}</Text>
        <View style={styles.iconContainer}>
          <Pressable onPress={handleDownload}>
            <DownloadIcon />
          </Pressable>
        </View>
        <View style={styles.actions}>
          <Button
            buttonText='Aprobar'
            variant='primary'
            size='small'
            //onPress={onApprove}
            style={styles.buttonCompact}
          />
          <Button
            buttonText='Rechazar'
            variant='delete'
            size='small'
            //onPress={onReject}
            style={styles.buttonCompact}
          />
        </View>
      </View>
    </View>
  )
}
