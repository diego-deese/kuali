import { Modal, View } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from 'react-native-ui-datepicker'
import { styles } from './styles'
import Button from '../../../shared/Button/Button'
import colors from '../../../../constants/colors'

interface DatePickerModalProps {
  selectedDate?: DateType
  visible?: boolean
  onChangeDate?: (selectedDate: DateType) => void
  onConfirm?: () => void
  minDate?: Date
  maxDate?: Date
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  selectedDate,
  onChangeDate,
  onConfirm,
  visible = false,
  minDate,
  maxDate,
}) => {
  const defaultStyles = useDefaultStyles()
  const [date, setDate] = useState<DateType>(selectedDate)
  return (
    <Modal
      transparent
      visible={visible}
      animationType='fade'
      onRequestClose={onConfirm}
    >
      <View style={styles.background}>
        <View style={styles.container}>
          <DateTimePicker
            locale='es'
            timeZone='America/Mexico_City'
            mode='single'
            date={date}
            onChange={({ date }) => {
              setDate(date)
              onChangeDate(date)
            }}
            maxDate={maxDate}
            minDate={minDate}
            timePicker
            showOutsideDays
            styles={{
              ...defaultStyles,
              selected: { backgroundColor: colors.selectionBlue },
              today_label: {},
              button_next: {},
              button_next_image: {
                tintColor: colors.highlightCyan,
                width: 20,
                height: 20,
              },
              button_prev_image: {
                tintColor: colors.highlightCyan,
                width: 20,
                height: 20,
              },
            }}
          />
          <Button buttonText='Confirmar' onPress={onConfirm} />
        </View>
      </View>
    </Modal>
  )
}

export default DatePickerModal
