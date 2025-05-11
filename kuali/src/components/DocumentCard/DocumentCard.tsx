import { View, Text } from 'react-native'
import styles from './DocumentCard.styles'
import { PendingIcon, RejectedIcon, AcceptedIcon } from '../shared/Icons/Icons'
import Button from '../shared/Button/Button'
import { DocumentStatus } from '../../types/UserDocument'

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
      case DocumentStatus.Pendiente:
        return <PendingIcon />
      case DocumentStatus.Aprobado:
        return <AcceptedIcon />
      case DocumentStatus.Rechazado:
        return <RejectedIcon />
      default:
        return <PendingIcon />
    }
  }

  // Función para obtener la descripción según el status
  const getDescription = () => {
    switch (status) {
      case DocumentStatus.Pendiente:
        return 'El documento está pendiente de aprobación'
      case DocumentStatus.Aprobado:
        return 'El documento ha sido aprobado'
      case DocumentStatus.Rechazado:
        return 'El documento ha sido rechazado'
      default:
        return 'Estado del documento desconocido'
    }
  }

  // Función para renderizar los botones según el status
  const renderButtons = () => {
    // Si el documento está aprobado, no mostramos botones
    if (status === DocumentStatus.Aprobado) {
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
