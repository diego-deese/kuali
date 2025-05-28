import { View, Text } from 'react-native'
import styles from './DocumentCard.styles'
import {
  PendingIcon,
  RejectedIcon,
  AcceptedIcon,
  UploadIcon,
} from '../shared/Icons/Icons'
import Button from '../shared/Button/Button'
import { DocumentStatus } from '../../types/UserDocument'
import * as DocumentPicker from 'expo-document-picker'

export interface Document {
  id: number
  title: string
  description: string
  status: DocumentStatus
  userDocumentId?: number
}

interface DocumentCardProps {
  document: Document
  onUpload?: (docId: number, fileUri?: string) => void
  onDelete?: (docId: number) => void
}

export default function DocumentCard({
  document,
  onUpload,
  onDelete,
}: DocumentCardProps) {
  const { id, title, description, status } = document

  const hasUploadedDocument = !!document.userDocumentId

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/msword',
        ],
        copyToCacheDirectory: true,
      })

      if (!result.canceled) {
        // Llamar a onUpload con el ID del documento y la URI del archivo seleccionado
        onUpload && onUpload(id, result.assets[0].uri)
      }
    } catch (error) {
      console.error('Error al seleccionar el archivo:', error)
    }
  }

  const renderIcon = () => {
    switch (status) {
      case DocumentStatus.Pendiente:
        return <PendingIcon size={32} />
      case DocumentStatus.Aprobado:
        return <AcceptedIcon size={32} />
      case DocumentStatus.Rechazado:
        return <RejectedIcon size={32} />
      default:
        return <UploadIcon size={32} />
    }
  }

  // Función para obtener la descripción según el status
  // const getDescription = () => {
  //   switch (status) {
  //     case DocumentStatus.Pendiente:
  //       return 'Documento pendiente de aprobación'
  //     case DocumentStatus.Aprobado:
  //       return 'El documento ha sido aprobado'
  //     case DocumentStatus.Rechazado:
  //       return 'El documento ha sido rechazado'
  //     default:
  //       return 'Estado del documento desconocido'
  //   }
  // }

  // Función para renderizar los botones según el status
  const renderButtons = () => {
    // Si el documento está aprobado, no mostramos botones
    if (status === DocumentStatus.Aprobado) {
      return null
    }
    // if (status === DocumentStatus.Rechazado) {
    //   return (
    //     <View style={styles.buttonContainer}>
    //       <Button
    //         buttonText='Subir documento'
    //         onPress={pickDocument}
    //         disabled={false}
    //         size='small'
    //       />
    //     </View>
    //   )
    // }
    // Si esta pendiente, se muestran ambos
    return (
      <View style={styles.buttonContainer}>
        <Button
          buttonText='Subir documento'
          onPress={pickDocument}
          disabled={hasUploadedDocument}
          size='small'
        />
        <Button
          buttonText='Eliminar documento'
          onPress={() => onDelete && onDelete(document.userDocumentId || 0)}
          size='small'
          variant='delete'
          disabled={!hasUploadedDocument}
        />
      </View>
    )
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {renderIcon()}
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      {renderButtons()}
    </View>
  )
}
