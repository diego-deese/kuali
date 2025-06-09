import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Calendar } from 'react-native-big-calendar'
import dayjs from 'dayjs'
import calendarTheme from './Calendar.styles'
import EventCalendarCard from '../EventCalendarCard/EventCalendarCard'
import LoadingModal from '../shared/LoadingModal/LoadingModal'
import { useGetActivities } from '../../hooks/CalendarActivities/useGetActivities'
import { useAppActions } from '../../context/AppActionsContext'

function getLimitedEvents(events: any[], limitPerDay: number) {
  const grouped: { [key: string]: any[] } = {}

  events.forEach((event) => {
    const dayKey = dayjs(event.start).format('YYYY-MM-DD')
    if (!grouped[dayKey]) grouped[dayKey] = []
    if (grouped[dayKey].length < limitPerDay) {
      grouped[dayKey].push(event)
    }
  })

  return Object.values(grouped).flat()
}

export default function CalendarComponent() {
  const [monthName, setMonthName] = useState(dayjs().format('MMMM'))
  const [monthNumber, setMonthNumber] = useState(dayjs().format('MM'))
  const { navigation } = useAppActions()
  const { activities, error, loading } = useGetActivities()

  const calendarEvents = activities.map((activity) => ({
    id: activity.activity_id,
    title: activity.title,
    start: dayjs(activity.event_date).toDate(),
    end: dayjs(activity.event_date).add(30, 'minute').toDate(),
  }))

  const updateDisplayedMonth = (date: Date) => {
    const newDate = dayjs(date)
    setMonthName(newDate.format('MMMM'))
    setMonthNumber(newDate.format('MM'))
  }

  const handleEventPress = (event: any) => {
    if (navigation.isNavigating) return
    navigation.navigate(`/event/${event.id}/info`)
  }

  return (
    <View>
      <View style={calendarTheme.styles.header}>
        <Text style={calendarTheme.styles.headerMonth}>{monthNumber}</Text>
        <Text style={calendarTheme.styles.headerText}>{monthName}</Text>
      </View>
      <Calendar
        events={getLimitedEvents(calendarEvents, 2)}
        height={500}
        mode='month'
        theme={calendarTheme}
        onChangeDate={([start]) => updateDisplayedMonth(start)}
        onSwipeEnd={(date) => updateDisplayedMonth(date)}
        renderEvent={(event) => (
          <EventCalendarCard
            id={event.id}
            title={event.title}
            date={dayjs(event.start).format('YYYY-MM-DD HH:mm')}
            onPress={() => handleEventPress(event)}
            disabled={navigation.isNavigating}
          />
        )}
      />
    </View>
  )
}
