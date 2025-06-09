import { useState } from 'react'
import { DateType } from 'react-native-ui-datepicker'

export const useDate = () => {
  const [validityDate, setValidityDate] = useState<DateType>(new Date())

  const onValidityDateChange = (newDate: Date) => {
    setValidityDate(newDate)
  }

  return { validityDate, onValidityDateChange }
}
