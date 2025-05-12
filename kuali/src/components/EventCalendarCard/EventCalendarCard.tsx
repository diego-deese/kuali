import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import styles from './EventCalendarCard.styles'

const EventCalendarCard = ({
  title,
  date,
  id,
  onPress,
}: {
  title: string
  date: string
  id: number
  onPress?: () => void
  disabled?: boolean
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default EventCalendarCard
