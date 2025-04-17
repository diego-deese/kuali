import { View, Text, SafeAreaView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import { useAuth } from '../../context/AuthContext'
import styles from './calendar.styles'
import CalendarComponent from '../../components/Calendar/Calendar'

export default function MyEvents() {
  const { user } = useAuth()

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.calendarContainer}>
          <CalendarComponent></CalendarComponent>
        </View>
        <View style={styles.nextEventsContainer}>
          <Text style={styles.textNextEvents}> Eventos próximos </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
