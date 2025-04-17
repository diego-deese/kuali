import { View, Text } from 'react-native'
import Button from '../Button/Button'
import styles from './DocumentCard.styles'
import { PendingIcon, RejectedIcon, AcceptedIcon } from '../Icons/Icons'

export type DocumentStatus = 'pending' | 'completed' | 'rejected'

interface DocumentCardProps {
  title: string
  description: string
  status: DocumentStatus
  onUpload?: () => void
  onDelete?: () => void
}

export default function DocumentCard({
  title,
  description,
  status,
  onUpload,
  onDelete,
}: DocumentCardProps) {
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

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {renderIcon()}
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.buttonContainer}>
        <Button
          buttonText='Subir documento'
          onPress={onUpload}
          disabled={status === 'completed'}
        />
        <Button buttonText='Eliminar documento' onPress={onDelete} />
      </View>
    </View>
  )
}
