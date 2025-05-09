import { Pressable, Text, View } from 'react-native'
import { router } from 'expo-router'
import styles from './EventCard.styles'
import { FormattedDate } from '../../shared/FormattedDate/FormattedDate'

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
  const handlePress = () => {
    router.push({
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
    <Pressable onPress={handlePress}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <FormattedDate date={event_date} style={styles.date}></FormattedDate>
      </View>
    </Pressable>
  )
}
