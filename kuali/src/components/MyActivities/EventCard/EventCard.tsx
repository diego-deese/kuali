import { Pressable, Text, View } from 'react-native'
import styles from './EventCard.styles'
import { FormattedDate } from '../../shared/FormattedDate/FormattedDate'
import { Activity } from '../../../types/Activity'
import { useAppActions } from '../../../context/AppActionsContext'

interface ActivityCardProps {
  activity: Activity
}

const EventCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const { navigation } = useAppActions()
  const handlePress = () => {
    navigation.navigate(`/event/${activity.activity_id}/info`)
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
    </>
  )
}

export default EventCard
