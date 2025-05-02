import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import { useAuth } from '../../context/AuthContext'
import styles from './calendar.styles'
import CalendarComponent from '../../components/Calendar/Calendar'
import IconButton from '../../components/IconButton/IconButton'
import NextEventCard from '../../components/NextEventCard/NextEventCard'
import { PlusIcon } from '../../components/shared/Icons/Icons'
import { router } from 'expo-router'

export default function MyEvents() {
  const { user } = useAuth()

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.calendarContainer}>
          <CalendarComponent></CalendarComponent>
        </View>
        <View style={styles.nextEventsContainer}>
          <View style={styles.nextEventsHeader}>
            <Text style={styles.textNextEvents}> Eventos próximos </Text>
            <IconButton
              icon={<PlusIcon />}
              onPress={() => console.log('Crear evento')}
            />
          </View>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 10 }}
            showsVerticalScrollIndicator={false}
          >
            <NextEventCard
              title={'Evento padrisimo'}
              event_date={new Date('2025-05-15T17:00:00')}
              location={'Auditorio'}
            ></NextEventCard>
            <NextEventCard
              title={'Evento padrisimo'}
              event_date={new Date('2025-05-15T17:00:00')}
              location={'Auditorio'}
            ></NextEventCard>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
