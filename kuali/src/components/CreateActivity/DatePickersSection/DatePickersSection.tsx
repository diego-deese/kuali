import { View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import ActivityDatePicker from '../DatePicker/ActivityDatePicker/ActivityDatePicker'

interface DatePickersSectionProps {
  activityDate: {
    activityDate: Date
    onActivityDateChange: (newDate: Date) => void
  }
  limitDate: {
    limitDate: Date
    onLimitDateChange: (newDate: Date) => void
  }
}

const DatePickersSection: React.FC<DatePickersSectionProps> = ({
  activityDate,
  limitDate,
}) => {
  return (
    <View style={styles.datePickersContainer}>
      <ActivityDatePicker
        date={activityDate.activityDate}
        setDate={activityDate.onActivityDateChange}
        title='Fecha del evento'
      />
      <ActivityDatePicker
        date={limitDate.limitDate}
        setDate={limitDate.onLimitDateChange}
        maxDate={activityDate.activityDate}
        title='Fecha límite de registro'
      />
    </View>
  )
}

export default DatePickersSection
