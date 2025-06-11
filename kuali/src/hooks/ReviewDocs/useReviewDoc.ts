import { useEffect, useState } from 'react'
import userDocumentService from '../../services/user-document.service'
import Toast from 'react-native-toast-message'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { Alert } from 'react-native'

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

      // 2. Convertir ArrayBuffer a base64 usando Buffer
      const arrayBuffer = result.data
      const base64String = Buffer.from(arrayBuffer).toString('base64')

      // 3. Crear nombre de archivo
      const fileName = `documentos_usuario_${userId}.zip`

      // 4. Crear archivo temporal con Expo FileSystem
      const fileUri = `${FileSystem.cacheDirectory}${fileName}`

      await FileSystem.writeAsStringAsync(fileUri, base64String, {
        encoding: FileSystem.EncodingType.Base64,
      })

      // 5. Verificar que el archivo se creó
      const fileInfo = await FileSystem.getInfoAsync(fileUri)
      if (!fileInfo.exists) {
        throw new Error('Error al crear el archivo')
      }

      console.log(`Archivo creado: ${fileInfo.size} bytes`)

      // 6. Compartir el archivo (permite al usuario elegir dónde guardarlo)
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/zip',
          dialogTitle: 'Guardar documentos',
          UTI: 'public.zip-archive',
        })
      } else {
        Alert.alert('Error', 'La función de compartir no está disponible')
      }

      // 7. Limpiar archivo temporal después de un tiempo
      setTimeout(() => {
        FileSystem.deleteAsync(fileUri, { idempotent: true }).catch((err) =>
          console.log('Error al limpiar archivo:', err),
        )
      }, 120000) // 2 minutos
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
