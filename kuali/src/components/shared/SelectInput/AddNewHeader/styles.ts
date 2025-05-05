import { StyleSheet } from 'react-native'
import colors from '../../../../constants/colors'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 2,
    borderColor: colors.borderGray,
  },
  title: {
    fontFamily: 'monserratRegular',
    fontSize: 16,
    includeFontPadding: false,
  },
})
