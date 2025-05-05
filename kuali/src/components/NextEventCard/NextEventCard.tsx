import { Text, View } from 'react-native'
import styles from './NextEventCard.styles'
import Button from '../shared/Button/Button'
import { router } from 'expo-router'
import { FormattedDate } from '../shared/FormattedDate/FormattedDate'

export default function NextEventCard({
  title,
  event_date,
  location,
  id,
}: {
  title: string
  event_date: Date
  location: string
  id: number
}) {
  const handlePress = () => {
    router.push({
      pathname: `/event/${id}`,
      params: { title, event_date: event_date.toISOString(), location, id },
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
          <Button buttonText='Ver más' onPress={handlePress} />
        </View>
      </View>
    </View>
  )
}
