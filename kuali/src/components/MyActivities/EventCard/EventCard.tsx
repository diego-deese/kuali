import { Pressable, Text, View } from 'react-native'
import { router } from 'expo-router'
import styles from './EventCard.styles'

export default function EventCard({
  title,
  date,
  id, //Para saber que evento es
}: {
  title: string
  date: string
  id: number
}) {
  const handlePress = () => {
    router.push({
      pathname: `/event/${id}`,
      params: { title, date },
    })
  }

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </Pressable>
  )
}
