import { View, Text, ScrollView, Pressable } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import DocumentCard, {
  Document,
} from '../../components/DocumentCard/DocumentCard'
import { useEffect, useState } from 'react'
import styles from './InfoEvents.styles'
import {
  CalendarEvent,
  LocationIcon,
} from '../../components/shared/Icons/Icons'
import ConfirmationModal from '../../components/shared/ConfirmationModal/ConfirmationModal'
import { FormattedDate } from '../../components/shared/FormattedDate/FormattedDate'
import Button from '../../components/shared/Button/Button'
import colors from '../../constants/colors'

// Detalles completos de un evento académico.
interface EventDetails {
  activity_id: number
  title: string
  event_date: Date
  location: string
  description: string
  documents: Document[]
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
    // console.log('Descripción recibida:', JSON.stringify(params))
    // console.log('Descripción específica:', params.description)
    // console.log('Tipo de descripción:', typeof params.description)
    const fetchEventDetails = async () => {
      try {
        setLoading(true)

        // Datos de ejemplo
        const mockData: EventDetails = {
          activity_id,
          title: (params.title as string) || 'Nombre del evento',
          event_date: params.event_date
            ? new Date(params.event_date as string)
            : new Date(),
          location: (params.location as string) || 'Lugar',
          description: params.desc
            ? decodeURIComponent(params.desc as string)
            : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer gravida justo et elit vulputate elementum at quis dolor. Nulla ac nibh dapibus est malesuada vehicula vitae a justo.',
          documents: [
            {
              id: 1,
              title: 'Documento 1',
              description: 'Solicita este documento en servicios escolares',
              status: 'pending',
            },
            {
              id: 2,
              title: 'Documento 2',
              description: 'Solicita este documento en servicios escolares',
              status: 'completed',
            },
            {
              id: 3,
              title: 'Documento 3',
              description: 'Descarga y llena el formulario',
              status: 'rejected',
            },
          ],
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
          <Text style={styles.eventInfoText}>{eventDetails.location}</Text>
        </View>
        <Text style={styles.description}>{eventDetails.description}</Text>

        {/* Requisitos/Documentos */}
        <Text style={styles.sectionTitle}>Requisitos</Text>

        {!hasApplied ? (
          /* Solo mostrar el botón de Aplicar cuando no ha aplicado */
          <Button
            buttonText='Aplicar'
            onPress={handleApply}
            //style={styles.applyButton}
          />
        ) : (
          /* Mostrar los requisitos y botón de salir solo cuando ya ha aplicado */
          <>
            {eventDetails.documents.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onUpload={handleUpload}
                onDelete={handleDelete}
              />
            ))}

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
