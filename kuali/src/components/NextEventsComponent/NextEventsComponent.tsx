import { View, Text } from 'react-native'
import React from 'react'
import NextEventCard from '../NextEventCard/NextEventCard'
import { Roles } from '../../constants/roles'
import { ScrollView } from 'react-native'
import WithRole from '../WithRole/WithRole'
import styles from './NextEventsComponent.styles'
import IconButton from '../shared/IconButton/IconButton'
import { PlusIcon } from '../shared/Icons/Icons'
import { Activity } from '../../types/Activity'
import { useAppActions } from '../../context/AppActionsContext'

export default function NextEventsComponents({
  activities,
}: {
  activities: Activity[]
}) {
  const { navigation } = useAppActions()

  return (
    <View style={styles.nextEventsContainer}>
      <View style={styles.nextEventsHeader}>
        <Text style={styles.textNextEvents}> Eventos próximos </Text>
        <WithRole role={Roles.ADMIN}>
          <IconButton
            disabled={navigation.isNavigating}
            icon={<PlusIcon />}
            onPress={() => navigation.navigate('/event/create')}
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
