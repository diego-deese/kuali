import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15, //Modifico para que quepan los botones
    borderRadius: 8,
    backgroundColor: colors.selectionBlue,
  },
  buttonDisabled: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: colors.standardGray,
  },
  buttonText: {
    color: colors.solidWhite,
    fontFamily: 'monserratRegular',
    fontSize: 14,
  },
})

export default styles
