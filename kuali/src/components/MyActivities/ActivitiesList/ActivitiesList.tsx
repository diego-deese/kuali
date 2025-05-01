import { ScrollView } from 'react-native'
import EventCard from '../EventCard/EventCard'
import { Activity } from '../../../types/Activity'
import { formatDate } from '../../../utils/parsing'
import styles from './styles'
import React from 'react'

interface ActivitiesListProps {
  activities: Activity[]
}

const ActivitiesList: React.FC<ActivitiesListProps> = ({ activities }) => {
  return (
    <ScrollView>
      {activities.map((activity) => (
        <EventCard
          key={activity.activity_id}
          id={activity.activity_id}
          title={activity.title}
          date={formatDate(activity.event_date)}
        />
      ))}
    </ScrollView>
  )
}

export default ActivitiesList
