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
import { DropDownIcon, DropUpIcon } from '../../components/shared/Icons/Icons'
import Toast from 'react-native-toast-message'

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
  const [hasApplied, setHasApplied] = useState(false)
  const [documentToDelete, setDocumentToDelete] = useState<number | null>(null)
  const [requirementsExpanded, setRequirementsExpanded] = useState(true)
  const [plantillasExpanded, setPlantillasExpanded] = useState(true)
  const [activeModal, setActiveModal] = useState<
    'none' | 'apply' | 'exit' | 'delete'
  >('none') // Un solo state para los modales

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
  useEffect(() => {
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
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: result.error || 'No se pudo subir el documento',
          position: 'top',
        })
      } else {
        // Actualizar la interfaz después de subir el documento
        fetchEventDetails()
        Toast.show({
          type: 'success',
          text1: 'Archivo subido',
          text2: 'El documento se subió correctamente',
          position: 'top',
          visibilityTime: 3000,
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
    setActiveModal('delete')
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

        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: result.error || 'No se pudo eliminar el documento',
          position: 'top',
        })
      } else {
        Toast.show({
          type: 'success',
          text1: 'Documento eliminado',
          text2: 'El documento se eliminó correctamente',
          position: 'top',
          visibilityTime: 3000,
        })
        // Refrescar los datos para actualizar la UI
        fetchEventDetails()
      }
    } catch (error) {
      console.error('Error al eliminar documento:', error)
      setError('Error al eliminar el documento')

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo eliminar el documento',
        position: 'top',
      })
    } finally {
      setLoading(false)
      setDocumentToDelete(null)
    }
  }

  const handleExit = async () => {
    try {
      setLoading(true)
      const result = await activityService.unregisterFromActivity(activity_id)

      if (result.success) {
        setHasApplied(false)
        Toast.show({
          type: 'success',
          text1: 'Baja procesada',
          text2: 'Te has dado de baja de la actividad correctamente',
          position: 'top',
          visibilityTime: 3000,
        })
        router.back()
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          position: 'top',
        })
      }
    } catch (error) {
      console.error('Error al darse de baja del evento:', error)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Ocurrió un error al procesar tu solicitud',
        position: 'top',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleApply = () => {
    setActiveModal('apply')
  }

  const confirmApply = async () => {
    try {
      setLoading(true)
      const result = await activityService.applyToActivity(activity_id)

      if (result.success) {
        setHasApplied(true)
        Toast.show({
          type: 'success',
          text1: 'Registro exitoso',
          text2: 'Te has registrado correctamente a la actividad',
          position: 'top',
          visibilityTime: 3000,
        })
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          position: 'top',
        })
      }
    } catch (error) {
      console.error('Error al aplicar a la convocatoria:', error)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Ocurrió un error al procesar tu solicitud',
        position: 'top',
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleRequirements = () => {
    setRequirementsExpanded(!requirementsExpanded)
  }

  const togglePlantillas = () => {
    setPlantillasExpanded(!plantillasExpanded)
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
      <View style={styles.content}>
        <EventDetailsHeader // Info del evento
          activity_id={activity_id}
          existingData={eventDetails}
          onDataLoaded={(data) => {
            setEventDetails(data)
            setHasApplied(data.isRegistered || false)
          }}
        />

        {/* Mostrar el botón de Aplicar cuando NO ha aplicado */}
        {!hasApplied ? (
          <Button buttonText='Aplicar' onPress={handleApply} />
        ) : (
          /* Mostrar las secciones desplegables cuando ya ha aplicado */
          <>
            {/* Sección de Plantillas */}
            <Pressable style={styles.sectionHeader} onPress={togglePlantillas}>
              <Text style={styles.sectionTitle}>Plantillas</Text>
              {plantillasExpanded ? <DropUpIcon /> : <DropDownIcon />}
            </Pressable>

            {plantillasExpanded && <View></View>}

            {/* Sección de Requisitos */}
            <Pressable
              style={styles.sectionHeader}
              onPress={toggleRequirements}
            >
              <Text style={styles.sectionTitle}>Requisitos</Text>
              {requirementsExpanded ? <DropUpIcon /> : <DropDownIcon />}
            </Pressable>

            {requirementsExpanded && (
              <View>
                {eventDetails.requirements &&
                eventDetails.requirements.length > 0 ? (
                  // Si hay requisitos, mapearlos
                  eventDetails.requirements.map((req) => {
                    const userDocument =
                      req.userDocuments && req.userDocuments.length > 0
                        ? req.userDocuments[0]
                        : undefined

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
                        onUpload={(docId, fileUri) =>
                          handleUpload(docId, fileUri)
                        }
                        onDelete={() =>
                          handleDelete(userDocument?.user_document_id || 0)
                        }
                      />
                    )
                  })
                ) : (
                  // Si NO hay requisitos, mostrar este mensaje
                  <Text style={styles.noRequirementsText}>
                    Esta actividad no tiene requisitos.
                  </Text>
                )}
              </View>
            )}

            {/* Botón para darse de baja*/}
            <Pressable
              style={styles.exitButton}
              onPress={() => setActiveModal('exit')}
            >
              <Text style={styles.exitButtonText}>
                Darte de baja del evento
              </Text>
            </Pressable>
          </>
        )}

        {/* Modal de confirmación para aplicar */}
        <ConfirmationModal
          visible={activeModal === 'apply'}
          title='Confirmar aplicación'
          description='¿Estás seguro que deseas aplicar a esta convocatoria? Recibirás notificaciones y alertas sobre los requisitos y fechas importantes.'
          confirmButtonText='Aplicar'
          confirmButtonColor={colors.selectionBlue}
          onCancel={() => setActiveModal('none')}
          onConfirm={() => {
            confirmApply()
            setActiveModal('none')
          }}
        />
        {/* Modal de confirmación para desuscribirse */}
        <ConfirmationModal
          visible={activeModal === 'exit'}
          title='Confirmación'
          description='¿Estás seguro que deseas ya no aplicar a esta convocatoria? Ya no volverás a recibir notificaciones ni alertas sobre ésta.'
          confirmButtonColor={colors.warningRed}
          onCancel={() => setActiveModal('none')}
          onConfirm={() => {
            handleExit()
            setActiveModal('none')
          }}
        />
        {/* Modal de confirmación para eliminar documento */}
        <ConfirmationModal
          visible={activeModal === 'delete'}
          title='Eliminar documento'
          description='¿Estás seguro que deseas eliminar este documento? Esta acción no se puede deshacer.'
          confirmButtonText='Eliminar'
          confirmButtonColor={colors.warningRed}
          onCancel={() => {
            setActiveModal('none')
            setDocumentToDelete(null)
          }}
          onConfirm={() => {
            confirmDelete()
            setActiveModal('none')
          }}
        />
      </View>
    </ScrollView>
  )
}

export default InfoEvent
