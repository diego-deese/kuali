import { useState } from 'react'
import Toast from 'react-native-toast-message'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import userDocumentService from '../../services/user-document.service'

export const useDownloadDocument = () => {
  const [downloading, setDownloading] = useState(false)

  const downloadDocument = async (
    userDocumentId: number,
    fileName = `documento_${userDocumentId}.pdf`,
  ) => {
    setDownloading(true)
    try {
      const blob =
        await userDocumentService.downloadUserDocument(userDocumentId)
      if (!blob) {
        Toast.show({
          type: 'error',
          text1: 'Error al descargar',
          text2: 'No se recibió el archivo del servidor',
        })
        return
      }

      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64 = reader.result?.toString().split(',')[1]
        if (!base64) {
          Toast.show({
            type: 'error',
            text1: 'Error al convertir archivo',
            text2: 'No se pudo leer el archivo',
          })
          return
        }

        const fileUri = FileSystem.documentDirectory + fileName
        await FileSystem.writeAsStringAsync(fileUri, base64, {
          encoding: FileSystem.EncodingType.Base64,
        })

        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri)
        } else {
          Toast.show({
            type: 'info',
            text1: 'Descarga completada',
            text2: 'El archivo está disponible localmente',
          })
        }
      }

      reader.readAsDataURL(blob)
    } catch (error: any) {
      console.error('Error al descargar documento:', error)
      Toast.show({
        type: 'error',
        text1: 'Descarga fallida',
        text2: error.message ?? 'Ocurrió un error inesperado',
      })
    } finally {
      setDownloading(false)
    }
  }

  return {
    downloadDocument,
    downloading,
  }
}
