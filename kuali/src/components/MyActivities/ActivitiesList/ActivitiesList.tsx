import React from 'react'
import { ScrollView } from 'react-native'

import EventCard from '../EventCard/EventCard'

import { Activity } from '../../../types/Activity'

interface ActivitiesListProps {
  activities: Activity[]
}

const ActivitiesList: React.FC<ActivitiesListProps> = ({ activities }) => {
  return (
    <ScrollView>
      {activities.map((activity) => (
        <EventCard
          key={activity.activity_id}
          activity_id={activity.activity_id}
          title={activity.title}
          event_date={new Date(activity.event_date)}
          location={activity.location.name}
        />
      ))}
    </ScrollView>
  )
}

export default ActivitiesList
