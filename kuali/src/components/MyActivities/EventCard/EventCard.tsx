import { Pressable, Text, View } from 'react-native'
import styles from './EventCard.styles'
import { FormattedDate } from '../../shared/FormattedDate/FormattedDate'
import { useEventNavigation } from '../../../hooks/NavigationActivity/useEventNavigation'
import LoadingModal from '../../shared/LoadingModal/LoadingModal'
import { Activity } from '../../../types/Activity'
import { router } from 'expo-router'

interface ActivityCardProps {
  activity: Activity
}

const EventCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const { isNavigating } = useEventNavigation()
  const handlePress = () => {
    router.navigate(`/event/${activity.activity_id}/info`)
  }

  return (
    <>
      <Pressable onPress={handlePress}>
        <View style={styles.card}>
          <Text style={styles.title}>{activity?.title || 'Sin título'}</Text>
          <FormattedDate
            date={new Date(activity.event_date)}
            style={styles.date}
          ></FormattedDate>
        </View>
      </Pressable>
      {/* Modal de carga */}
      <LoadingModal visible={isNavigating} />
    </>
  )
}

export default EventCard
