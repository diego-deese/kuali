import { useEffect, useState } from 'react'
import userDocumentService from '../../services/user-document.service'
import Toast from 'react-native-toast-message'

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
  }
}
