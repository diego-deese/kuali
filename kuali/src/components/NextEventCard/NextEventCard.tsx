import { Text, View } from 'react-native'
import styles from './NextEventCard.styles'
import Button from '../shared/Button/Button'

export default function NextEventCard({
  title,
  event_date,
  location,
}: {
  title: string
  event_date: Date
  location: string
}) {
  const formattedDate = event_date.toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const formattedTime = event_date.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <View style={styles.cardContainer}>
      <View style={styles.content}>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{title}</Text>
          <Text style={styles.eventMoreInfo}>
            {formattedDate} a las {formattedTime}
          </Text>
          <Text style={styles.eventMoreInfo}>{location}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button buttonText='Ver más' />
        </View>
      </View>
    </View>
  )
}
