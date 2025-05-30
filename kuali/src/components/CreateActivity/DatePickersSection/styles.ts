import { StyleSheet } from 'react-native'
import colors from '../../../constants/colors'

export const styles = StyleSheet.create({
  datePickersContainer: {
    marginBottom: 8,
  },
  errorLabel: {
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
    fontSize: 16,
    color: colors.warningRed,
    marginStart: 8,
    marginBottom: 8,
  },
})
