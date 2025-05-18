import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import { formatDate } from '../../../../utils/parsing'
import IconButton from '../../../shared/IconButton/IconButton'
import { EditCalendarIcon } from '../../../shared/Icons/Icons'
import colors from '../../../../constants/colors'
import DatePickerModal from '../DatePickerModal/DatePickerModal'

interface ActivityDatePickerProps {
  title?: string
  date?: Date
  onDateChange?: (newDate: Date) => void
  minDate?: Date
  maxDate?: Date
}

const ActivityDatePicker: React.FC<ActivityDatePickerProps> = ({
  title,
  date,
  onDateChange,
  minDate = new Date(),
  maxDate,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false)

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>{title}</Text>
        <Text>{formatDate(date)}</Text>
      </View>
      <IconButton
        icon={
          <EditCalendarIcon
            color={colors.solidWhite}
            style={styles.iconButton}
          />
        }
        onPress={() => setShowDatePicker(!showDatePicker)}
      />

      <DatePickerModal
        selectedDate={date}
        onChangeDate={onDateChange}
        onConfirm={() => setShowDatePicker(false)}
        minDate={minDate}
        maxDate={maxDate}
        visible={showDatePicker}
      />
    </View>
  )
}

export default ActivityDatePicker
