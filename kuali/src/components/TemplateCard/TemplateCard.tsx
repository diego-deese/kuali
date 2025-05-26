import { View, Text, Alert, Platform } from 'react-native'
import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'
import Button from '../shared/Button/Button'
import { DownloadIcon } from '../shared/Icons/Icons'
import * as WebBrowser from 'expo-web-browser'
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

  // Función para detectar la extensión del archivo basada en la URL
  const getFileExtension = (url: string): string => {
    // Primero intenta extraer la extensión de la URL
    if (url.includes('.pdf')) return 'pdf'
    if (url.includes('.doc') && !url.includes('.docx')) return 'doc'
    if (url.includes('.docx')) return 'docx'

    // Si no puede determinar por URL, verifica por el nombre del template
    const nameLower = name.toLowerCase()
    if (nameLower.includes('pdf')) return 'pdf'
    if (nameLower.includes('word') || nameLower.includes('doc')) return 'docx'

    // Valor por defecto
    return 'pdf'
  }

  const handleTemplateDownload = async () => {
    try {
      // Mostrar un indicador de carga
      Toast.show({
        type: 'info',
        text1: 'Preparando documento...',
        position: 'top',
        autoHide: true,
        visibilityTime: 2000,
      })

      // Verificar si debemos usar onDownload o template.id
      if (onDownload) {
        onDownload(id)
        return
      }

      // Obtener la URL de descarga con el token incluido
      const downloadUrl = await documentService.getTemplateDownloadUrl(id)

      // Verificar que la URL se generó correctamente
      if (!downloadUrl) {
        throw new Error('No se pudo generar la URL de descarga')
      }

      // Abrir el navegador con la URL
      await WebBrowser.openBrowserAsync(downloadUrl)
    } catch (error) {
      console.error('Error al obtener URL de descarga:', error)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo descargar la plantilla',
        position: 'top',
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
          buttonText={
            Platform.OS === 'ios' ? 'Abrir documento' : 'Descargar documento'
          }
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
