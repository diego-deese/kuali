import { View, Text } from 'react-native'
import React from 'react'
import NextEventCard from '../NextEventCard/NextEventCard'
import { Roles } from '../../constants/roles'
import { ScrollView } from 'react-native'
import WithRole from '../WithRole/WithRole'
import styles from './NextEventsComponent.styles'
import IconButton from '../shared/IconButton/IconButton'
import { PlusIcon } from '../shared/Icons/Icons'
import { router } from 'expo-router'
import { Activity } from '../../types/Activity'

export default function NextEventsComponents({
  activities,
}: {
  activities: Activity[]
}) {
  return (
    <View style={styles.nextEventsContainer}>
      <View style={styles.nextEventsHeader}>
        <Text style={styles.textNextEvents}> Eventos próximos </Text>
        <WithRole role={Roles.ADMIN}>
          <IconButton
            icon={<PlusIcon />}
            onPress={() => router.push('/event/manage/create')}
          />
        </WithRole>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {activities.map((activity) => (
          <NextEventCard
            key={activity.activity_id}
            activity_id={activity.activity_id}
            title={activity.title}
            event_date={new Date(activity.event_date)}
            location={activity.location?.name || 'Ubicación no disponible'}
          />
        ))}
      </ScrollView>
    </View>
  )
}
