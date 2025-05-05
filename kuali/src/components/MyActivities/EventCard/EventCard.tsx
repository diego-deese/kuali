import { Pressable, Text, View } from 'react-native'
import { router } from 'expo-router'
import styles from './EventCard.styles'
import { FormattedDate } from '../../shared/FormattedDate/FormattedDate'

export default function EventCard({
  title,
  event_date,
  location,
  id, //Para saber que evento es
}: {
  title: string
  event_date: Date
  id: number
  location: string
}) {
  const handlePress = () => {
    router.push({
      pathname: `/event/${id}`,
      params: { title, event_date: event_date.toISOString(), location, id },
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
