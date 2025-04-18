import { View, Text, ScrollView, Pressable } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import DocumentCard from '../../components/DocumentCard/DocumentCard'
import { useEffect, useState } from 'react'
import styles from './InfoEvents.styles'

// Tipos para nuestros datos
type DocumentStatus = 'pending' | 'completed' | 'rejected'

interface Document {
  id: number
  title: string
  description: string
  status: DocumentStatus
}

interface EventDetails {
  id: number
  title: string
  date: string
  location: string
  description: string
  documents: Document[]
}

export default function InfoEvent() {
  const params = useLocalSearchParams()
  const eventId = params.id ? Number(params.id) : 0

  // Estado que simulará la respuesta del endpoint
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simular la llamada a una API
    const fetchEventDetails = async () => {
      try {
        setLoading(true)
        // Aquí iría la llamada real al endpoint
        // const response = await fetch(`/api/events/${eventId}`)
        // const data = await response.json()

        // Datos de ejemplo - esto vendría del endpoint
        const mockData: EventDetails = {
          id: eventId,
          title: (params.title as string) || 'Nombre del evento',
          date: (params.date as string) || 'Fecha, 00:00 hrs',
          location: 'Lugar',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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

        // Simular un pequeño retraso como en una llamada real
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
  }, [eventId, params.title, params.date])

  const handleUpload = (docId: number) => {
    // Lógica para subir documento - integrar con API en el futuro
    console.log(`Subiendo documento ${docId}`)
    // Cuando tengamos la API:
    // const response = await fetch(`/api/documents/${docId}/upload`, { method: 'POST', body: formData })
  }

  const handleDelete = (docId: number) => {
    // Lógica para eliminar documento - integrar con API en el futuro
    console.log(`Eliminando documento ${docId}`)
    // Cuando tengamos la API:
    // const response = await fetch(`/api/documents/${docId}`, { method: 'DELETE' })
  }

  const handleExit = () => {
    // Lógica para salir de la convocatoria - integrar con API en el futuro
    console.log('Saliendo de esta convocatoria')
    // Cuando tengamos la API:
    // const response = await fetch(`/api/events/${eventId}/unsubscribe`, { method: 'POST' })
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          {/* Información del evento */}
          <Text style={styles.eventTitle}>{eventDetails.title}</Text>
          <View style={styles.eventInfoRow}>
            <Text style={styles.eventInfoIcon}>⏱</Text>
            <Text style={styles.eventInfoText}>{eventDetails.date}</Text>
          </View>
          <View style={styles.eventInfoRow}>
            <Text style={styles.eventInfoIcon}>📍</Text>
            <Text style={styles.eventInfoText}>{eventDetails.location}</Text>
          </View>
          <Text style={styles.description}>{eventDetails.description}</Text>

          {/* Requisitos/Documentos */}
          <Text style={styles.sectionTitle}>Requisitos</Text>
          {eventDetails.documents.map((doc) => (
            <DocumentCard
              key={doc.id}
              title={doc.title}
              description={doc.description}
              status={doc.status as 'pending' | 'completed' | 'rejected'}
              onUpload={() => handleUpload(doc.id)}
              onDelete={() => handleDelete(doc.id)}
            />
          ))}

          {/* Botón de salir */}
          <Pressable style={styles.exitButton} onPress={handleExit}>
            <Text style={styles.exitButtonText}>
              Salir de esta convocatoria
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
