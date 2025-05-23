import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import userDocumentService from '../../services/user-document.service'
import { ResponseError } from '../../types/Request'

export const useGroupedUserDocuments = (activityId: number) => {
  const [documentsByRequirement, setDocumentsByRequirement] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchDocuments = async () => {
    setLoading(true)
    try {
      const result =
        await userDocumentService.getDocumentsGroupedByRequirement(activityId)

      if (!result.success) {
        Toast.show({
          type: 'error',
          text1: 'Error al cargar documentos',
          text2: result.message ?? 'Ocurrió un error inesperado',
        })
        setDocumentsByRequirement([])
      } else {
        setDocumentsByRequirement(result.data)
      }
    } catch (error: any) {
      console.error('Error inesperado:', error)
      Toast.show({
        type: 'error',
        text1: 'Error inesperado',
        text2: error.message ?? 'No se pudieron cargar los documentos',
      })
      setDocumentsByRequirement([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (activityId) fetchDocuments()
  }, [activityId])

  return {
    documentsByRequirement,
    loading,
    refetch: fetchDocuments,
  }
}
