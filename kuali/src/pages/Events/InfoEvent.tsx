import { View, Text, ScrollView, Pressable } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import DocumentCard from '../../components/DocumentCard/DocumentCard'
import { useEffect, useState } from 'react'
import styles from './InfoEvents.styles'

import ConfirmationModal from '../../components/shared/ConfirmationModal/ConfirmationModal'
import Button from '../../components/shared/Button/Button'
import colors from '../../constants/colors'
import { DocumentStatus } from '../../types/UserDocument'
import { Activity } from '../../types/Activity'
import { getDocumentStatusFromString } from './InfoEvent.utils'
import activityService from '../../services/activity.service'
import EventDetailsHeader from '../../components/Event/EventDetailsHeader'
import documentService from '../../services/document.service'
/*
   Pantalla que muestra información detallada de un evento específico,
  incluyendo sus requisitos documentales y permitiendo al usuario
  gestionar su participación.
 */
const InfoEvent: React.FC = () => {
  const params = useLocalSearchParams()
  const activity_id = params.activity_id ? Number(params.activity_id) : 0

  const [eventDetails, setEventDetails] = useState<Activity | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [applyModalVisible, setApplyModalVisible] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [documentToDelete, setDocumentToDelete] = useState<number | null>(null)

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true)

        if (!activity_id) {
          setError('ID de actividad no válido')
          setLoading(false)
          return
        }

        // Llamada al servicio para obtener detalles de la actividad
        const result = await activityService.getActivityById(activity_id)

        if (!result.success && 'error' in result) {
          setError(result.error || 'No se pudo cargar la información')
          setLoading(false)
          return
        }

        setEventDetails(result.data)
        // Verificar si el usuario ya está registrado en esta actividad
        setHasApplied(result.data.isRegistered || false)
        setLoading(false)
      } catch (err) {
        setError('Error al cargar los detalles del evento')
        setLoading(false)
        console.error(err)
      }
    }

    fetchEventDetails()
  }, [activity_id])

  const handleUpload = async (docId: number, fileUri?: string) => {
    // Implementación de la llamada al servicio para subir documento
    try {
      if (!fileUri) {
        console.error('No se proporcionó URI del archivo')
        return
      }

      setLoading(true)
      const result = await documentService.uploadDocument(
        activity_id,
        docId,
        fileUri,
      )

      if (!result.success && 'error' in result) {
        setError(result.error || 'Error al subir documento')
        console.error('Error:', result.error)
      } else {
        // Actualizar la interfaz después de subir el documento
        // fetchEventDetails()
        console.log('¡Documento subido correctamente!', {
          activityId: activity_id,
          requirementId: docId,
          fileName: fileUri.split('/').pop(),
        })
      }
    } catch (error) {
      console.error('Error al subir documento:', error)
      setError('Error al subir el documento')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (docId: number) => {
    // Implementación de la llamada al servicio para eliminar documento
    if (!docId) {
      console.error('ID de documento inválido')
      return
    }
    setDocumentToDelete(docId)
    setDeleteModalVisible(true)
  }
  const confirmDelete = async () => {
    try {
      if (!documentToDelete) {
        console.error('ID de documento inválido')
        return
      }

      setLoading(true)
      console.log('Eliminando documento:', documentToDelete)
      const result = await documentService.deleteDocument(documentToDelete)

      if (!result.success && 'error' in result) {
        setError(result.error || 'Error al eliminar documento')
        console.error('Error:', result.error)
      } else {
        console.log('¡Documento eliminado correctamente!')
        // Refrescar los datos para actualizar la UI
        //fetchEventDetails()
      }
    } catch (error) {
      console.error('Error al eliminar documento:', error)
      setError('Error al eliminar el documento')
    } finally {
      setLoading(false)
      setDeleteModalVisible(false)
      setDocumentToDelete(null)
    }
  }

  const handleExit = async () => {
    try {
      // const result = await activityService.unregisterFromActivity(activity_id)?

      // if (result.success) {
      //   setHasApplied(false)
      // }

      console.log('Saliendo de esta convocatoria')
      router.back()
    } catch (error) {
      console.error('Error al darse de baja del evento:', error)
    }
  }

  const handleApply = () => {
    setApplyModalVisible(true)
  }

  const confirmApply = async () => {
    try {
      // const result = await activityService.applyToActivity(activity_id)?

      // if (result.success) {
      //   setHasApplied(true)
      // }

      console.log('Aplicando a la convocatoria')
      setHasApplied(true)
      setApplyModalVisible(false)
    } catch (error) {
      console.error('Error al aplicar a la convocatoria:', error)
      setApplyModalVisible(false)
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            Cargando detalles del evento...
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  if (error || !eventDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error || 'No se pudo cargar la información'}
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <ScrollView>
      <Button
        buttonText='Regresar'
        style={styles.backButton}
        onPress={() => router.back()}
      />
      <View style={styles.content}>
        <EventDetailsHeader // Info del evento
          activity_id={activity_id}
          existingData={eventDetails}
          onDataLoaded={(data) => {
            setEventDetails(data)
            setHasApplied(data.isRegistered || false)
          }}
        />

        {/* Requisitos/Documentos */}
        <Text style={styles.sectionTitle}>Requisitos</Text>

        {!hasApplied ? (
          /* Solo mostrar el botón de Aplicar cuando no ha aplicado */
          <Button buttonText='Aplicar' onPress={handleApply} />
        ) : (
          /* Mostrar los requisitos y botón de salir solo cuando ya ha aplicado */
          <>
            {eventDetails.requirements &&
            eventDetails.requirements.length > 0 ? (
              // Si hay requisitos, mapearlos
              eventDetails.requirements.map((req) => {
                // Obtener el documento del usuario si existe
                const userDocument =
                  req.userDocuments && req.userDocuments.length > 0
                    ? req.userDocuments[0]
                    : undefined

                // Determinar el estado del documento basado en el status
                const documentStatus = userDocument?.status?.name
                  ? getDocumentStatusFromString(userDocument.status.name)
                  : DocumentStatus.Pendiente

                return (
                  <DocumentCard
                    key={req.requirement_id}
                    document={{
                      id: req.requirement_id,
                      title: req.name,
                      description: req.description,
                      status: documentStatus,
                      userDocumentId: userDocument?.user_document_id,
                    }}
                    onUpload={(docId, fileUri) => handleUpload(docId, fileUri)}
                    onDelete={() =>
                      handleDelete(userDocument?.user_document_id || 0)
                    }
                  />
                )
              })
            ) : (
              // Si NO hay requisitos, mostrar este mensaje
              <Text style={styles.noRequirementsText}>
                Esta actividad no tiene requisitos documentales.
              </Text>
            )}

            {/* Botón de salir */}
            <Pressable
              style={styles.exitButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.exitButtonText}>
                Darte de baja del evento
              </Text>
            </Pressable>
          </>
        )}

        {/* Modal de confirmación para aplicar */}
        <ConfirmationModal
          visible={applyModalVisible}
          title='Confirmar aplicación'
          description='¿Estás seguro que deseas aplicar a esta convocatoria? Recibirás notificaciones y alertas sobre los requisitos y fechas importantes.'
          confirmButtonText='Aplicar'
          confirmButtonColor={colors.selectionBlue}
          onCancel={() => setApplyModalVisible(false)}
          onConfirm={confirmApply}
        />
        {/* Modal de confirmación para desuscribirse */}
        <ConfirmationModal
          visible={modalVisible}
          title='Confirmación'
          description='¿Estás seguro que deseas ya no aplicar a esta convocatoria? Ya no volverás a recibir notificaciones ni alertas sobre ésta.'
          confirmButtonColor={colors.warningRed}
          onCancel={() => setModalVisible(false)}
          onConfirm={() => {
            handleExit()
            setModalVisible(false)
          }}
        />
        {/* Modal de confirmación para eliminar documento */}
        <ConfirmationModal
          visible={deleteModalVisible}
          title='Eliminar documento'
          description='¿Estás seguro que deseas eliminar este documento? Esta acción no se puede deshacer.'
          confirmButtonText='Eliminar'
          confirmButtonColor={colors.warningRed}
          onCancel={() => {
            setDeleteModalVisible(false)
            setDocumentToDelete(null)
          }}
          onConfirm={confirmDelete}
        />
      </View>
    </ScrollView>
  )
}

export default InfoEvent
