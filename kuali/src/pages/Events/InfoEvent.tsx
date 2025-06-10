import { View, Text, ScrollView, Pressable, RefreshControl } from 'react-native'
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
import TemplateCard from '../../components/TemplateCard/TemplateCard'
import WithRole from '../../components/WithRole/WithRole'
import { Roles } from '../../constants/roles'
import { useAuth } from '../../context/AuthContext'
import LoadingModal from '../../components/shared/LoadingModal/LoadingModal'
import { useAppActions } from '../../context/AppActionsContext'
/*
   Pantalla que muestra información detallada de un evento específico,
  incluyendo sus requisitos documentales y permitiendo al usuario
  gestionar su participación.
 */
const InfoEvent: React.FC = () => {
  const { user } = useAuth()
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
  >('none')
  const [showLoadingModal, setShowLoadingModal] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const { navigation } = useAppActions()

  const fetchEventDetails = async () => {
    try {
      setLoading(true)

      if (!activity_id) {
        setError('ID de actividad no válido')
        setLoading(false)
        return
      }

      const result = await activityService.getActivityById(activity_id)

      if (!result.success && 'error' in result) {
        setError(result.error || 'No se pudo cargar la información')
        setLoading(false)
        return
      }

      setEventDetails(result.data)
      // Verificar si el usuario ya está registrado en la actividad
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

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchEventDetails()
    setRefreshing(false)
  }

  const handleUpload = async (docId: number, fileUri?: string) => {
    try {
      if (!fileUri) {
        console.error('No se proporcionó URI del archivo')
        return
      }
      setShowLoadingModal(true)
      //setLoading(true)
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
        fetchEventDetails() //si jalo
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
      //setLoading(false)
      setShowLoadingModal(false)
    }
  }

  const handleDelete = async (docId: number) => {
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
      setShowLoadingModal(true)
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
      setShowLoadingModal(false)
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

  const handleTemplateDownload = async (templateId: number) => {
    try {
      const template = eventDetails?.requirements?.find(
        (req) => req.requirement_id === templateId && req.template,
      )

      if (!template) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'No se encontró la plantilla',
          position: 'top',
        })
        return
      }

      Toast.show({
        type: 'info',
        text1: 'Descargando documento...',
        position: 'top',
        autoHide: false,
      })

      // Descargar
      const result = await documentService.downloadTemplate(
        template.template.requirement_template_id,
        template.name,
      )

      Toast.hide()

      if (result.success && result.localUri) {
        Toast.show({
          type: 'success',
          text1: 'Descarga completada',
          text2: 'Documento descargado',
          position: 'top',
          visibilityTime: 3000,
        })

        try {
          await documentService.shareFile(result.localUri)
        } catch (shareError) {
          console.warn(
            'No se pudo compartir el archivo automáticamente:',
            shareError,
          )
          Toast.show({
            type: 'info',
            text1: 'Archivo guardado',
            position: 'top',
            visibilityTime: 4000,
          })
        }
      } else {
        throw new Error(result.error || 'No se pudo descargar la plantilla')
      }
    } catch (error) {
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
  const isRegistrationClosed = (): boolean => {
    if (!eventDetails?.register_date_limit) return false

    const now = new Date()
    const limitDate = new Date(eventDetails.register_date_limit)

    return now > limitDate
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
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.content}>
        <EventDetailsHeader // Info del evento
          activity_id={activity_id}
          existingData={eventDetails}
          onDataLoaded={(data) => {
            setEventDetails(data)
            setHasApplied(data.isRegistered || false)
          }}
        />
        {/* Panel Administrativo solo visible para ADMIN y cuando category_id === 1 */}
        <WithRole role={Roles.ADMIN}>
          {eventDetails.category.category_id === 1 && (
            <>
              <Button
                buttonText='Revisión de documentos'
                disabled={navigation.isNavigating}
                onPress={() => {
                  navigation.navigate(
                    `/review/student/student?activity_id=${activity_id}`,
                  )
                }}
                style={{ marginBottom: 12 }}
              />
            </>
          )}
        </WithRole>
        {user?.role.role_id !== Roles.ADMIN &&
          (!hasApplied && !isRegistrationClosed() ? (
            <Button buttonText='Aplicar' onPress={handleApply} />
          ) : !hasApplied && isRegistrationClosed() ? (
            <View style={styles.registrationClosedContainer}>
              <Text style={styles.registrationClosedText}>
                El período de registro para este evento ha finalizado
              </Text>
            </View>
          ) : (
            <>
              {/* Sección de Plantillas */}
              {eventDetails.requirements &&
                eventDetails.requirements.some((req) => req.template) && (
                  <>
                    <Pressable
                      style={styles.sectionHeader}
                      onPress={togglePlantillas}
                    >
                      <Text style={styles.sectionTitle}>Plantillas</Text>
                      {plantillasExpanded ? <DropUpIcon /> : <DropDownIcon />}
                    </Pressable>

                    {plantillasExpanded && (
                      <View>
                        {eventDetails.requirements
                          .filter((req) => req.template)
                          .map((req) => (
                            <TemplateCard
                              key={`template-${req.requirement_id}`}
                              template={{
                                id: req.requirement_id,
                                name: req.name,
                                description: req.description,
                              }}
                              onDownload={handleTemplateDownload}
                            />
                          ))}
                      </View>
                    )}
                  </>
                )}

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
                          showButtons={!isRegistrationClosed()}
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
              {!isRegistrationClosed() && (
                <Button
                  buttonText='Darte de baja del evento'
                  onPress={() => setActiveModal('exit')}
                  style={styles.unsuscribedButton}
                />
              )}
            </>
          ))}

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
        {/* Modal de carga */}
        <LoadingModal visible={showLoadingModal} />
      </View>
    </ScrollView>
  )
}

export default InfoEvent
