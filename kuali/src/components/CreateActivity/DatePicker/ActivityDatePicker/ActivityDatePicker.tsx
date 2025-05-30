import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import IconButton from '../../../shared/IconButton/IconButton'
import { EditCalendarIcon } from '../../../shared/Icons/Icons'
import colors from '../../../../constants/colors'
import DatePickerModal from '../DatePickerModal/DatePickerModal'
import { DateType } from 'react-native-ui-datepicker'
import { FormattedDate } from '../../../shared/FormattedDate/FormattedDate'

interface ActivityDatePickerProps {
  title?: string
  date?: DateType
  onDateChange?: (newDate: DateType) => void
  minDate?: DateType
  maxDate?: DateType
  error?: boolean
}

const ActivityDatePicker: React.FC<ActivityDatePickerProps> = ({
  title,
  date,
  onDateChange,
  minDate = new Date(),
  maxDate,
  error = false,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false)

  return (
    <View
      style={[
        styles.container,
        error ? { borderColor: colors.warningRed } : {},
      ]}
    >
      <View>
        <Text style={styles.header}>{title}</Text>
        <FormattedDate date={date as Date} separator=', ' />
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
