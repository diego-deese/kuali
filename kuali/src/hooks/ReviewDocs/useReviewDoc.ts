import { useEffect, useState } from 'react'
import userDocumentService from '../../services/user-document.service'
import Toast from 'react-native-toast-message'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { Alert } from 'react-native'
import { Buffer } from 'buffer'

export const useGroupedUserDocuments = (
  activityId: number,
  groupBy: 'requirement' | 'user' = 'requirement',
) => {
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [documents, setDocuments] = useState<any[]>([])

  const fetchGroupedDocuments = async () => {
    setLoading(true)
    try {
      const result = await userDocumentService.getDocumentsGroupedBy(
        activityId,
        groupBy,
      )

      if (!result.success) {
        Toast.show({
          type: 'error',
          text1: 'Error al cargar documentos',
          text2: result.message ?? 'Ocurrió un error inesperado',
        })
        setDocuments([])
      } else {
        setDocuments(result.data)
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error inesperado',
        text2: error.message ?? 'No se pudieron cargar los documentos',
      })
      setDocuments([])
    } finally {
      setLoading(false)
    }
  }

  const downloadAllDocumentsByUser = async (userId: number): Promise<void> => {
    setLoading(true)
    try {
      const result = await userDocumentService.downloadAllDocumentsByUser(
        userId,
        activityId,
      )

      if (!result.success && 'error' in result) {
        Toast.show({
          type: 'error',
          text1: result.message,
          text2: result.error,
        })
        return
      }

      let fileName = 'documentos.zip' // Default file name

      const contentDisposition = result.data.headers['content-disposition']

      if (contentDisposition) {
        // Search for filename= or filename*=
        const filenameMatch = contentDisposition.match(
          /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,
        )
        if (filenameMatch && filenameMatch[1]) {
          fileName = filenameMatch[1].replace(/['"]/g, '')
          // Decode
          if (fileName.includes('UTF-8')) {
            fileName = decodeURIComponent(fileName.split("''")[1])
          }
        }
      }

      console.log('Nombre del archivo extraído:', fileName)

      // 1. Convert from base64 to ArrayBuffer using Buffer
      const arrayBuffer = result.data.data
      const base64String = Buffer.from(arrayBuffer).toString('base64')

      // 2. Create temp file
      const fileUri = `${FileSystem.cacheDirectory}${fileName}`

      await FileSystem.writeAsStringAsync(fileUri, base64String, {
        encoding: FileSystem.EncodingType.Base64,
      })

      // 3. Verify file is created
      const fileInfo = await FileSystem.getInfoAsync(fileUri)
      if (!fileInfo.exists) {
        throw new Error('Error al crear el archivo')
      }

      // 4. "Share the file" (allows the user choose where to save it)
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/zip',
          dialogTitle: 'Guardar documentos',
          UTI: 'public.zip-archive',
        })
      } else {
        Alert.alert('Error', 'La función de compartir no está disponible')
      }

      // 5. Delete temp file after some time
      setTimeout(() => {
        FileSystem.deleteAsync(fileUri, { idempotent: true }).catch((err) =>
          console.log('Error al limpiar archivo:', err),
        )
      }, 120000)
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error al procesar archivo',
        text2: error.message ?? 'Ocurrió un error inesperado',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchGroupedDocuments()
    setRefreshing(false)
  }

  useEffect(() => {
    if (activityId) fetchGroupedDocuments()
  }, [activityId, groupBy])

  return {
    loading,
    refreshing,
    handleRefresh,
    documentsByRequirement: groupBy === 'requirement' ? documents : [],
    documentsByUser: groupBy === 'user' ? documents : [],
    refetch: fetchGroupedDocuments,
    downloadAllDocumentsByUser,
  }
}
