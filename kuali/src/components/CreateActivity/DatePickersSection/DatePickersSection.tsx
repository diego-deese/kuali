import { Text, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import ActivityDatePicker from '../DatePicker/ActivityDatePicker/ActivityDatePicker'
import { useActivityFormContext } from '../../../context/ActivityFormContext/ActivityFormContext'

const DatePickersSection = () => {
  const { dates, errors } = useActivityFormContext()

  return (
    <View style={styles.datePickersContainer}>
      <ActivityDatePicker
        date={dates.activityDate}
        onDateChange={dates.onActivityDateChange}
        title='Fecha de la actividad'
        error={errors.dates.error}
      />
      <ActivityDatePicker
        date={dates.limitDate}
        onDateChange={dates.onLimitDateChange}
        maxDate={dates.activityDate}
        title='Fecha límite de registro'
        error={errors.dates.error}
      />
      {errors.dates.error && (
        <Text style={styles.errorLabel}>{errors.dates.errorMessage}</Text>
      )}
    </View>
  )
}

export default DatePickersSection
