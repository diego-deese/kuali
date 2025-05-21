import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { CalendarEvent, LocationIcon } from '../shared/Icons/Icons' // Corregir la ruta
import { FormattedDate } from '../shared/FormattedDate/FormattedDate' // Corregir la ruta
import { Activity } from '../../types/Activity'
import { parseValidDate } from '../../pages/Events/InfoEvent.utils'
import activityService from '../../services/activity.service'
import styles from '../../pages/Events/InfoEvents.styles'

interface EventDetailsHeaderProps {
  activity_id: number
  existingData?: Activity | null // Nueva prop para datos preexistentes
  onDataLoaded?: (eventDetails: Activity) => void
}

const EventDetailsHeader: React.FC<EventDetailsHeaderProps> = ({
  activity_id,
  existingData, // Recibir datos existentes
  onDataLoaded,
}) => {
  // Usar datos existentes como estado inicial si están disponibles
  const [eventDetails, setEventDetails] = useState<Activity | null>(
    existingData || null,
  )
  // Si tenemos datos existentes, no necesitamos iniciar en estado de carga
  const [loading, setLoading] = useState(!existingData)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Si ya tenemos datos existentes, no necesitamos hacer la llamada al API
    if (existingData) {
      return
    }

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
        // Notificar al componente padre que los datos se cargaron
        if (onDataLoaded) {
          onDataLoaded(result.data)
        }
        setLoading(false)
      } catch (err) {
        setError('Error al cargar los detalles del evento')
        setLoading(false)
        console.error(err)
      }
    }

    fetchEventDetails()
  }, [activity_id, onDataLoaded, existingData])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando detalles del evento...</Text>
      </View>
    )
  }

  if (error || !eventDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error || 'No se pudo cargar la información'}
        </Text>
      </View>
    )
  }

  return (
    <>
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
    </>
  )
}

export default EventDetailsHeader
