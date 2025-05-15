import { View, Text, ScrollView, Pressable } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import DocumentCard, {
  Document,
} from '../../components/DocumentCard/DocumentCard'
import { useEffect, useState } from 'react'
import styles from './InfoEvents.styles'
import { CalendarEvent, LocationIcon } from '../../components/shared/Icons/Icons'
import ConfirmationModal from '../../components/shared/ConfirmationModal/ConfirmationModal'
import { FormattedDate } from '../../components/shared/FormattedDate/FormattedDate'
import Button from '../../components/shared/Button/Button'
import colors from '../../constants/colors'
import { Requirements } from '../../types/Requirements'
import { UserDocument, DocumentStatus } from '../../types/UserDocument'

// Detalles completos de un evento académico.
interface EventDetails {
  activity_id: number
  title: string
  description: string
  event_date: Date
  register_date_limit: Date
  location: {
    location_id: number
    name: string
  }
  category: {
    category_id: number
    name: string
  }
  requirements: Requirements[]
  isRegistered: boolean
}

/*
   Pantalla que muestra información detallada de un evento específico,
  incluyendo sus requisitos documentales y permitiendo al usuario
  gestionar su participación.
 */
export default function InfoEvent() {
  const params = useLocalSearchParams()
  const activity_id = params.id ? Number(params.id) : 0

  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [applyModalVisible, setApplyModalVisible] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true)

        // Datos de ejemplo
        const mockData: EventDetails = {
          activity_id,
          title: (params.title as string) || 'Nombre del evento',
          description:
            (params.des as string) || 'Lorem ipsum dolor sit amet...',
          event_date: params.event_date
            ? new Date(params.event_date as string)
            : new Date(),
          register_date_limit: new Date(Date.now()),
          location: {
            location_id: 1,
            name: (params.location as string) || 'Lugar',
          },
          category: {
            category_id: 1,
            name: 'Evento académico',
          },
          requirements: [
            {
              requirement_id: 1,
              name: 'Documento 1',
              description: 'Solicita este documento en servicios escolares',
              userDocuments: [],
            },
            {
              requirement_id: 2,
              name: 'Documento 2',
              description: 'Solicita este documento en servicios escolares',
              userDocuments: [
                {
                  user_document_id: 101,
                  status: {
                    revision_status_id: 2,
                    name: DocumentStatus.Aprobado,
                  },
                },
              ],
            },
            {
              requirement_id: 3,
              name: 'Documento 3',
              description: 'Descarga y llena el formulario',
              userDocuments: [
                {
                  user_document_id: 102,
                  status: {
                    revision_status_id: 2,
                    name: DocumentStatus.Rechazado,
                  },
                },
              ],
            },
          ],
          isRegistered: false, // Por defecto no está registrado
        }

        // Simular llamda xd
        setTimeout(() => {
          setEventDetails(mockData)
          setLoading(false)
        }, 500)
      } catch (err) {
        setError('Error al cargar los detalles del evento')
        setLoading(false)
        console.error(err)
      }
    }

    fetchEventDetails()
  }, [
    activity_id,
    params.title,
    params.event_date,
    params.location,
    params.description,
  ])

  const handleUpload = (docId: number) => {
    // Lógica para subir documento - integrar con API en el futuro
    console.log(`Subiendo documento ${docId}`)
  }

  const handleDelete = (docId: number) => {
    // Lógica para eliminar documento - integrar con API en el futuro
    console.log(`Eliminando documento ${docId}`)
  }

  const handleExit = () => {
    console.log('Saliendo de esta convocatoria')
    router.back()
  }

  const handleApply = () => {
    setApplyModalVisible(true)
  }

  const confirmApply = () => {
    console.log('Aplicando a la convocatoria')
    setHasApplied(true)
    setApplyModalVisible(false)
  }

  // Agrega esta función antes del return en tu componente InfoEvent
  const getDocumentStatusFromString = (
    statusName: DocumentStatus | string,
  ): DocumentStatus => {
    // Si ya es un DocumentStatus, devuélvelo directamente
    if (Object.values(DocumentStatus).includes(statusName as DocumentStatus)) {
      return statusName as DocumentStatus
    }

    // Si es un string, conviértelo al enum correspondiente
    switch (String(statusName).toLowerCase()) {
      case 'aprobado':
        return DocumentStatus.Aprobado
      case 'rechazado':
        return DocumentStatus.Rechazado
      default:
        return DocumentStatus.Pendiente
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
          <FormattedDate
            date={eventDetails.event_date}
            style={styles.eventInfoText}
          />
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
          <FormattedDate
            date={eventDetails.register_date_limit}
            style={styles.registerLimitDate}
            showTime={false}
          />
        </View>

        {/* Requisitos/Documentos */}
        <Text style={styles.sectionTitle}>Requisitos</Text>

        {!hasApplied ? (
          /* Solo mostrar el botón de Aplicar cuando no ha aplicado */
          <Button buttonText='Aplicar' onPress={handleApply} />
        ) : (
          /* Mostrar los requisitos y botón de salir solo cuando ya ha aplicado */
          <>
            {eventDetails.requirements.map((req) => {
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
                  onUpload={() => handleUpload(req.requirement_id)}
                  onDelete={() =>
                    handleDelete(userDocument?.user_document_id || 0)
                  }
                />
              )
            })}

            {/* Botón de salir */}
            <Pressable
              style={styles.exitButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.exitButtonText}>
                Darte de baja de la convocatoria
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
        {/* Modal de confirmación */}
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
