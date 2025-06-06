import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import {
  CalendarClockIcon,
  DeleteIcon,
  PlaceIcon,
  SquareEditIcon,
  VisibilityIcon,
} from '../shared/Icons/Icons'
import { FormattedDate } from '../shared/FormattedDate/FormattedDate'
import { Activity } from '../../types/Activity'
import { parseValidDate } from '../../pages/Events/InfoEvent.utils'
import activityService from '../../services/activity.service'
import styles from '../../pages/Events/InfoEvents.styles'
import colors from '../../constants/colors'
import IconButton from '../shared/IconButton/IconButton'
import WithRole from '../WithRole/WithRole'
import { Roles } from '../../constants/roles'
import ConfirmationModal from '../shared/ConfirmationModal/ConfirmationModal'
import Toast from 'react-native-toast-message'
import { useAppActions } from '../../context/AppActionsContext'
import PosterModal from '../CreateActivity/PosterModal/PosterModal'

interface EventDetailsHeaderProps {
  activity_id: number
  existingData?: Activity | null
  onDataLoaded?: (eventDetails: Activity) => void
}

const EventDetailsHeader: React.FC<EventDetailsHeaderProps> = ({
  activity_id,
  existingData,
  onDataLoaded,
}) => {
  // Usar datos existentes como estado inicial si están disponibles
  const [eventDetails, setEventDetails] = useState<Activity | null>(
    existingData || null,
  )
  // Si tenemos datos existentes, no necesitamos iniciar en estado de carga
  const [loading, setLoading] = useState(!existingData)
  const [error, setError] = useState<string | null>(null)

  const [showModal, setShowModal] = useState(false)
  const [showPosterModal, setShowPosterModal] = useState(false)

  const { navigation } = useAppActions()

  useEffect(() => {
    // Recibe los datos si los hay
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

        // Si no hace la llamada, no se que tan bueno sea que lo haga pero confio
        const result = await activityService.getActivityById(activity_id)

        if (!result.success && 'error' in result) {
          setError(result.error || 'No se pudo cargar la información')
          setLoading(false)
          return
        }

        setEventDetails(result.data)
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

  const getPosterUrl = () => {
    if (activity_id) {
      return activityService.getActivityPosterUrl(activity_id)
    }
    return ''
  }

  const handleViewPoster = () => {
    setShowPosterModal(true)
  }

  const handleClosePosterModal = () => {
    setShowPosterModal(false)
  }

  const deleteActivity = async (activityId: number) => {
    setShowModal(false)
    try {
      const result = await activityService.deleteActivity(activityId)

      if (!result.success && 'error' in result) {
        Toast.show({
          type: 'error',
          text1: result.message,
          text2: result.error,
        })
        return
      }

      Toast.show({
        text1: 'Actividad eliminada',
        text2: 'La actividad y todos sus datos han sido eliminados',
      })

      navigation.replace(`/calendar`)
    } catch (error) {
      console.error(error)
      Toast.show({
        type: 'error',
        text1: 'Error al eliminar la actividad',
        text2: 'Por favor intenta de nuevo más tarde',
      })
    }
  }

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
      <View style={styles.eventDetailsContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.eventTitle}>{eventDetails.title}</Text>
          <WithRole role={Roles.ADMIN}>
            <IconButton
              disabled={navigation.isNavigating}
              icon={
                <DeleteIcon fill={false} color={colors.warningRed} size={32} />
              }
              onPress={() => {
                setShowModal(true)
              }}
            />
            <IconButton
              disabled={navigation.isNavigating}
              icon={
                <SquareEditIcon
                  fill={false}
                  color={colors.selectionBlue}
                  size={32}
                />
              }
              onPress={() => {
                navigation.navigate(`/event/${activity_id}/edit`)
              }}
            />
          </WithRole>
        </View>
        <View style={styles.eventInfoRow}>
          <CalendarClockIcon
            fill={false}
            color={colors.selectionBlue}
            size={22}
          />
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
          <PlaceIcon fill={false} color={colors.selectionBlue} />
          <Text style={styles.eventInfoText}>{eventDetails.location.name}</Text>
        </View>
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
        <Text style={styles.description}>{eventDetails.description}</Text>

        {/* Card para ver poster */}
        <View style={styles.posterCard}>
          <Text style={styles.posterCardTitle}>Poster del evento</Text>
          <IconButton
            icon={
              <VisibilityIcon
                color={colors.solidWhite}
                style={styles.viewPosterButton}
              />
            }
            onPress={handleViewPoster}
          />
        </View>
      </View>

      <ConfirmationModal
        visible={showModal}
        showWarning
        variant='delete'
        title='¿Estás seguro que deseas eliminar esta actividad?'
        description='Todas las inscripciones, requisitos, plantillas de requisitos y documentos subidos por los usuarios serán eliminados también.'
        confirmButtonColor={colors.warningRed}
        confirmButtonText='Eliminar'
        onConfirm={() => {
          deleteActivity(activity_id)
        }}
        onCancel={() => {
          setShowModal(false)
        }}
      />
      <PosterModal
        visible={showPosterModal}
        posterUri={getPosterUrl()}
        onCloseModal={handleClosePosterModal}
      />
    </>
  )
}

export default EventDetailsHeader
