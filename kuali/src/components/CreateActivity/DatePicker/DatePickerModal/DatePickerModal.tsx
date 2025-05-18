import { Modal, View } from 'react-native'
import React from 'react'
import DateTimePicker, { DateType } from 'react-native-ui-datepicker'
import { styles } from './styles'
import Button from '../../../shared/Button/Button'
import { datePickerStyles } from '../../../../constants/datepicker'

interface DatePickerModalProps {
  selectedDate?: Date
  visible?: boolean
  onChangeDate?: (selectedDate: Date) => void
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
  return (
    <Modal
      transparent
      visible={visible}
      animationType='fade'
      onRequestClose={onConfirm}
    >
      <View style={styles.background}>
        <View style={styles.container}>
          <View style={styles.datePickerContainer}>
            <DateTimePicker
              locale='es'
              timeZone='America/Mexico_City'
              mode='single'
              date={selectedDate}
              onChange={({ date }) => {
                onChangeDate(new Date(date.valueOf()))
              }}
              maxDate={maxDate}
              minDate={minDate}
              timePicker
              showOutsideDays
              styles={datePickerStyles}
              navigationPosition='right'
            />
          </View>
          <Button buttonText='Confirmar' onPress={onConfirm} />
        </View>
      </View>
    </Modal>
  )
}

export default DatePickerModal
