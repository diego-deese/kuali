import { Pressable, Text, View } from 'react-native'
import styles from './EventCard.styles'
import { FormattedDate } from '../../shared/FormattedDate/FormattedDate'
import { useEventNavigation } from '../../../hooks/NavigationActivity/useEventNavigation'
import LoadingModal from '../../shared/LoadingModal/LoadingModal'

export default function EventCard({
  title,
  event_date,
  location,
  activity_id,
  description,
}: {
  title: string
  event_date: Date
  activity_id: number
  location: string
  description: string
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
        des: encodeURIComponent(description),
      },
    })
  }

  return (
    <>
      <Pressable onPress={handlePress}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <FormattedDate date={event_date} style={styles.date}></FormattedDate>
        </View>
      </Pressable>
      {/* Modal de carga */}
      <LoadingModal visible={isNavigating} />
    </>
  )
}
