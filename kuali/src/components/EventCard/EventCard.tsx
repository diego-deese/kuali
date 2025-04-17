
import { Text, View } from 'react-native'
import styles from './EventCard.styles'


export default function EventCard({
  title,
  date,
}: {
  title: string
  date: string
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  )
}
