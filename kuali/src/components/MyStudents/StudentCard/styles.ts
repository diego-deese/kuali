import { StyleSheet } from 'react-native'
import colors from '../../../constants/colors'

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.solidWhite,
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    elevation: 3,
  },
  name: {
    fontFamily: 'monserratBold',
    includeFontPadding: false,
    fontSize: 16,
    color: colors.fontBlack,
  },
  project: {
    marginTop: 4,
    fontSize: 14,
    color: colors.standardGray,
  },
})

export default styles
