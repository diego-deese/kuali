import { View, Text, ScrollView, Pressable } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import DocumentCard from '../../components/DocumentCard/DocumentCard'
import { useEffect, useState } from 'react'
import styles from './InfoEvents.styles'
import { CalendarEvent, LocationIcon } from '../../components/shared/Icons/Icons'
import ConfirmationModal from '../../components/shared/ConfirmationModal/ConfirmationModal'
import Button from '../../components/shared/Button/Button'
import colors from '../../constants/colors'
import { DocumentStatus } from '../../types/UserDocument'
import { Activity } from '../../types/Activity'
import { getDocumentStatusFromString } from './InfoEvent.utils'
import { FormattedDate } from '../../components/shared/FormattedDate/FormattedDate'
import { parseValidDate } from './InfoEvent.utils'
import activityService from '../../services/activity.service'
import WithRole from '../../components/WithRole/WithRole'
import { Roles } from '../../constants/roles'
import { useAuth } from '../../context/AuthContext'

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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [applyModalVisible, setApplyModalVisible] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)

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

  const handleUpload = async (docId: number) => {
    // Implementación de la llamada al servicio para subir documento
    try {
      // Aquí iría la lógica para seleccionar un archivo
      // const result = await documentService.uploadDocument(activity_id, docId, fileData)

      // Si la subida es exitosa, actualizar los datos
      // if (result.success) {
      //   // Refrescar los datos para mostrar el documento actualizado
      //   fetchEventDetails()
      // }

      // Por ahora, solo mostramos el mensaje en consola
      console.log(`Subiendo documento ${docId}`)
    } catch (error) {
      console.error('Error al subir documento:', error)
    }
  }

  const handleDelete = async (docId: number) => {
    // Implementación de la llamada al servicio para eliminar documento
    try {
      // const result = await documentService.deleteDocument(docId)

      // Si la eliminación es exitosa, actualizar los datos
      // if (result.success) {
      //   // Refrescar los datos para actualizar la UI
      //   fetchEventDetails()
      // }

      // Por ahora, solo mostramos el mensaje en consola
      console.log(`Eliminando documento ${docId}`)
    } catch (error) {
      console.error('Error al eliminar documento:', error)
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
        {/* Información del evento */}
        <Text style={styles.eventTitle}>{eventDetails.title}</Text>
        <View style={styles.eventInfoRow}>
          <CalendarEvent style={styles.eventInfoIcon} />
          <Text style={styles.eventInfoText}>
            {parseValidDate(eventDetails.event_date) ? (
              <FormattedDate
                date={parseValidDate(eventDetails.event_date)!}
                separator=', '
                showWeekday={false}
              />
            ) : (
              eventDetails.event_date
            )}
          </Text>
        </View>
        <View style={styles.eventInfoRow}>
          <LocationIcon style={styles.eventInfoIcon} />
          <Text style={styles.eventInfoText}>{eventDetails.location.name}</Text>
        </View>
        <Text style={styles.description}>{eventDetails.description}</Text>
        {/* Fecha límite de registro */}
        <View style={styles.registerLimitContainer}>
          <Text style={styles.registerLimitLabel}>
            Fecha límite de registro:{' '}
          </Text>
          <Text style={styles.registerLimitDate}>
            {parseValidDate(eventDetails.register_date_limit) ? (
              <FormattedDate
                date={parseValidDate(eventDetails.register_date_limit)!}
                separator=', '
                showWeekday={false}
              />
            ) : (
              eventDetails.register_date_limit
            )}
          </Text>
        </View>

        <WithRole role={Roles.ADMIN}>
          {/*Solo los ADMIN deben ver */}
          <Text style={styles.sectionTitle}>Panel Administrativo</Text>
          <Button
            buttonText='Revisar por estudiantes'
            onPress={() =>
              router.push({
                pathname: '/documents/student/studentsDoc',
                params: { activity_id: activity_id.toString() },
              })
            }
          />
          {/*
          Botón deshabilitado temporalmente mientras se implementa navegación segura a ReviewDoc
          <Button
            buttonText='Revisar por documento'
            onPress={() => router.push('/documents/doc/[id]')}
          />
          */}
        </WithRole>
        {user?.role.role_id !== Roles.ADMIN && (
          <>
            <Text style={styles.sectionTitle}>Requisitos</Text>

            {!hasApplied ? (
              <Button buttonText='Aplicar' onPress={handleApply} />
            ) : (
              <>
                {eventDetails.requirements?.length > 0 ? (
                  eventDetails.requirements.map((req) => {
                    const userDocument = req.userDocuments?.[0]
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
                        onUpload={() => handleUpload(req.requirement_id)}
                        onDelete={() =>
                          handleDelete(userDocument?.user_document_id || 0)
                        }
                      />
                    )
                  })
                ) : (
                  <Text style={styles.noRequirementsText}>
                    Esta actividad no tiene requisitos documentales.
                  </Text>
                )}

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
      </View>
    </ScrollView>
  )
}

export default InfoEvent
