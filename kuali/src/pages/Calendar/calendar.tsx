import { View, SafeAreaView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import { useAuth } from '../../context/AuthContext'
import styles from './calendar.styles'
import CalendarComponent from '../../components/Calendar/Calendar'
import NextEventsComponents from '../../components/NextEventsComponent/NextEventsComponent'
import { useGetActivities } from '../../hooks/CalendarActivities/useGetActivities';

export default function MyEvents() {
  const { activities, error, loading} = useGetActivities()
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.calendarContainer}>
          <CalendarComponent></CalendarComponent>
        </View>
        <NextEventsComponents activities={activities}></NextEventsComponents>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
