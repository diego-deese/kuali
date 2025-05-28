import { Text, View } from 'react-native'
import styles from './NextEventCard.styles'
import Button from '../shared/Button/Button'
import { FormattedDate } from '../shared/FormattedDate/FormattedDate'
import { useAppActions } from '../../context/AppActionsContext'
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
  const { navigation } = useAppActions()

  const handlePress = () => {
    navigation.navigate(`/event/${activity_id}/info`)
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
            disabled={navigation.isNavigating}
          />
        </View>
      </View>
    </View>
  )
}
