import { useState } from 'react'
import { DateType } from 'react-native-ui-datepicker'

export const useDates = () => {
  const [activityDate, setActivityDate] = useState<DateType>(new Date())
  const [limitDate, setLimitDate] = useState(activityDate)

  const onActivityDateChange = (newDate: Date) => {
    setActivityDate(newDate)
    if (new Date(limitDate.toString()) > new Date(newDate.toString()))
      setLimitDate(newDate)
  }

  const onLimitDateChange = (newDate: Date) => {
    setLimitDate(newDate)
  }

  return { activityDate, limitDate, onActivityDateChange, onLimitDateChange }
}
