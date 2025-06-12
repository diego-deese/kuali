import { View, SafeAreaView, ScrollView, RefreshControl } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import styles from './calendar.styles'
import CalendarComponent from '../../components/Calendar/Calendar'
import NextEventsComponents from '../../components/NextEventsComponent/NextEventsComponent'
import { useGetActivities } from '../../hooks/CalendarActivities/useGetActivities'
import colors from '../../constants/colors'
import LoadingModal from '../../components/shared/LoadingModal/LoadingModal'

export default function MyEvents() {
  const { upcomingActivities, refresh, loading } = useGetActivities()
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          // contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refresh.isRefreshing}
              onRefresh={refresh.refresh}
              tintColor={colors.selectionBlue}
              colors={[colors.selectionBlue]}
            />
          }
        >
          <View style={styles.calendarContainer}>
            <CalendarComponent />
          </View>
          <NextEventsComponents activities={upcomingActivities} />
          <LoadingModal visible={loading} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
