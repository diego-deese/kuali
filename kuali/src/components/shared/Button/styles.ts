import { StyleSheet } from 'react-native'
import colors from '../../../constants/colors'

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15, //Modifico para que quepan los botones
    borderRadius: 8,
    backgroundColor: colors.selectionBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: colors.standardGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.solidWhite,
    fontFamily: 'monserratRegular',
    fontSize: 16,
    includeFontPadding: false,
    textAlign: 'center',
  },
  buttonSmall: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    flex: 1,
  },
  buttonTextSmall: {
    fontSize: 14,
  },
})

export default styles
