import { View, Text, Platform } from 'react-native'
import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'
import Button from '../shared/Button/Button'
import { DownloadIcon } from '../shared/Icons/Icons'
import Toast from 'react-native-toast-message'
import documentService from '../../services/document.service'

export interface Template {
  id: number
  name: string
  description: string
  downloadUrl?: string
}

interface TemplateCardProps {
  template: Template
  onDownload?: (templateId: number) => void
}

export default function TemplateCard({
  template,
  onDownload,
}: TemplateCardProps) {
  const { id, name, description } = template

  const handleTemplateDownload = async () => {
    try {
      // Mostrar un indicador de carga
      Toast.show({
        type: 'info',
        text1: 'Descargando documento...',
        position: 'top',
        autoHide: false,
      })

      // Verificar si debemos usar onDownload personalizado
      if (onDownload) {
        onDownload(id)
        return
      }

      // Descargar usando FileSystem
      const result = await documentService.downloadTemplate(id, name)

      // Ocultar toast de carga
      Toast.hide()

      if (result.success && result.localUri) {
        // Mostrar toast de éxito
        Toast.show({
          type: 'success',
          text1: 'Descarga completada',
          text2:
            Platform.OS === 'ios'
              ? 'Documento guardado'
              : 'Documento descargado',
          position: 'top',
          visibilityTime: 3000,
        })

        // En iOS, compartir el archivo automáticamente
        if (Platform.OS === 'ios') {
          await documentService.shareFile(result.localUri)
        }
      } else {
        throw new Error(result.error || 'No se pudo descargar la plantilla')
      }
    } catch (error) {
      // Ocultar toast de carga en caso de error
      Toast.hide()

      console.error('Error al descargar plantilla:', error)
      Toast.show({
        type: 'error',
        text1: 'Error de descarga',
        text2:
          error instanceof Error
            ? error.message
            : 'No se pudo descargar la plantilla',
        position: 'top',
        visibilityTime: 4000,
      })
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <DownloadIcon />
        <View style={styles.headerText}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonText={'Descargar documento'}
          onPress={handleTemplateDownload}
          size='small'
          variant='primary'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.solidWhite,
    borderRadius: 8,
    padding: 24,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  headerText: {
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: 'monserratBold',
    includeFontPadding: false,
  },
  description: {
    fontSize: 14,
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
    color: colors.standardGray,
  },
  buttonContainer: {
    width: '100%',
  },
})
