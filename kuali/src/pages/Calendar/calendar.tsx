import { View, SafeAreaView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import styles from './calendar.styles'
import CalendarComponent from '../../components/Calendar/Calendar'
import NextEventsComponents from '../../components/NextEventsComponent/NextEventsComponent'
import { useGetActivities } from '../../hooks/CalendarActivities/useGetActivities'

export default function MyEvents() {
  const { upcomingActivities } = useGetActivities()
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.calendarContainer}>
          <CalendarComponent />
        </View>
        <NextEventsComponents activities={upcomingActivities} />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
