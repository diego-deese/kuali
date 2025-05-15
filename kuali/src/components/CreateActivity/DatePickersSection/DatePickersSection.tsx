import { View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import ActivityDatePicker from '../DatePicker/ActivityDatePicker/ActivityDatePicker'
import { useCreateActivity } from '../../../context/CreateActivityContext/useCreateActivity'

const DatePickersSection = () => {
  const { activityDate, limitDate } = useCreateActivity()

  return (
    <View style={styles.datePickersContainer}>
      <ActivityDatePicker
        date={activityDate.activityDate}
        onDateChange={activityDate.onActivityDateChange}
        title='Fecha del evento'
      />
      <ActivityDatePicker
        date={limitDate.limitDate}
        onDateChange={limitDate.onLimitDateChange}
        maxDate={activityDate.activityDate}
        title='Fecha límite de registro'
      />
    </View>
  )
}

export default DatePickersSection
