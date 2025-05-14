import { Text, View } from 'react-native'
import styles from './NextEventCard.styles'
import Button from '../shared/Button/Button'
import { FormattedDate } from '../shared/FormattedDate/FormattedDate'
import LoadingModal from '../shared/LoadingModal/LoadingModal'
import { useEventNavigation } from '../../hooks/NavigationActivity/useEventNavigation'
export default function NextEventCard({
  title,
  event_date,
  location,
  activity_id,
}: {
  title: string
  event_date: Date
  location: string
  activity_id: number
}) {
  const { isNavigating, navigateToEvent } = useEventNavigation()

  const handlePress = () => {
    navigateToEvent({
      pathname: `/event/${activity_id}`,
      params: {
        title,
        event_date: event_date.toISOString(),
        location,
        activity_id,
      },
    })
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.content}>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{title}</Text>
          <FormattedDate
            date={event_date}
            style={styles.eventMoreInfo}
          ></FormattedDate>
          <Text style={styles.eventMoreInfo}>{location}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonText='Ver más'
            onPress={handlePress}
            disabled={isNavigating} // Deshabilitar el botón durante la carga
          />
        </View>
      </View>

      {/* Modal de carga */}
      <LoadingModal visible={isNavigating} />
    </View>
  )
}
