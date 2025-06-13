import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Calendar } from 'react-native-big-calendar'
import dayjs from 'dayjs'
import calendarTheme, { styles } from './Calendar.styles'
import EventCalendarCard from '../EventCalendarCard/EventCalendarCard'
import { useAppActions } from '../../context/AppActionsContext'
import 'dayjs/locale/es'
import { Activity } from '../../types/Activity'
dayjs.locale('es')

interface CalendarComponentProps {
  activities: Activity[]
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  activities = [],
}) => {
  const formatMonth = (monthName: string) => {
    return monthName.charAt(0).toUpperCase() + monthName.slice(1)
  }

  const [monthName, setMonthName] = useState(
    formatMonth(dayjs().format('MMMM')),
  )
  const [monthNumber, setMonthNumber] = useState(dayjs().format('MM'))
  const [year, setYear] = useState(dayjs().format('YYYY')) // Añadimos el estado para el año
  const { navigation } = useAppActions()

  const calendarEvents = activities.map((activity) => ({
    id: activity.activity_id,
    title: activity.title,
    start: dayjs(activity.event_date).toDate(),
    end: dayjs(activity.event_date).endOf('day').toDate(),
  }))

  const updateDisplayedMonth = (date: Date) => {
    const newDate = dayjs(date)
    const month = newDate.format('MMMM')
    setMonthName(formatMonth(month))
    setMonthNumber(newDate.format('MM'))
    setYear(newDate.format('YYYY'))
  }

  const handleEventPress = (event: any) => {
    if (navigation.isNavigating) return
    navigation.navigate(`/event/${event.id}/info`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.monthContainer}>
          <Text style={styles.headerMonth}>{monthNumber}</Text>
          <Text style={styles.headerText}>{monthName}</Text>
        </View>
        <Text style={styles.headerYear}>{year}</Text>
      </View>
      <View style={styles.calendarWrapper}>
        <Calendar
          height={450}
          locale='es'
          events={calendarEvents}
          maxVisibleEventCount={2}
          moreLabel={'+'}
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
    </View>
  )
}

export default CalendarComponent
