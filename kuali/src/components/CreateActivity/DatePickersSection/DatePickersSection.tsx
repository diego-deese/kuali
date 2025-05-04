import { View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import ActivityDatePicker from '../DatePicker/ActivityDatePicker/ActivityDatePicker'

const DatePickersSection = ({ eventDate, limitDate }) => {
  return (
    <View style={styles.datePickersContainer}>
      <ActivityDatePicker
        date={eventDate.eventDate}
        setDate={eventDate.setEventDate}
        title='Fecha del evento'
      />
      <ActivityDatePicker
        date={limitDate.limitDate}
        setDate={limitDate.setLimitDate}
        maxDate={eventDate.eventDate}
        title='Fecha límite de registro'
      />
    </View>
  )
}

export default DatePickersSection
