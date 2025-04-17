import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 8,
    backgroundColor: colors.selectionBlue,
  },
  buttonDisabled: {
    paddingVertical: 8,
    paddingHorizontal: 30,
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
