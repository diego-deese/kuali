import { View, Text } from 'react-native'
import Button from '../Button/Button'
import styles from './DocumentCard.styles'
import { PendingIcon, RejectedIcon, AcceptedIcon } from '../Icons/Icons'

export type DocumentStatus = 'pending' | 'completed' | 'rejected'

export interface Document {
  id: number
  title: string
  description: string
  status: DocumentStatus
}

interface DocumentCardProps {
  document: Document
  onUpload?: (docId: number) => void
  onDelete?: (docId: number) => void
}

export default function DocumentCard({
  document,
  onUpload,
  onDelete,
}: DocumentCardProps) {
  const { id, title, description, status } = document

  const renderIcon = () => {
    switch (status) {
      case 'pending':
        return <PendingIcon />
      case 'completed':
        return <AcceptedIcon />
      case 'rejected':
        return <RejectedIcon />
    }
  }

  // Función para obtener la descripción según el status
  const getDescription = () => {
    switch (status) {
      case 'pending':
        return 'El documento está pendiente de aprobación'
      case 'completed':
        return 'El documento ha sido aprobado'
      case 'rejected':
        return 'El documento ha sido rechazado'
    }
  }

  // Función para renderizar los botones según el status
  const renderButtons = () => {
    // Si el documento está aprobado, no mostramos botones
    if (status === 'completed') {
      return null
    }

    // Si no está aprobado, mostramos los botones normalmente
    return (
      <View style={styles.buttonContainer}>
        <Button
          buttonText='Subir documento'
          onPress={() => onUpload && onUpload(id)}
          disabled={false}
          size='small'
        />
        <Button
          buttonText='Eliminar documento'
          onPress={() => onDelete && onDelete(id)}
          size='small'
          variant='delete'
        />
      </View>
    )
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {renderIcon()}
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.description}>{getDescription()}</Text>
      {renderButtons()}
    </View>
  )
}
