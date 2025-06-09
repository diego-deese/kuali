import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: colors.backgroundWhite,
  },
  title: {
    fontSize: 22,
    fontFamily: 'monserratBold',
    includeFontPadding: false,
    marginBottom: 20,
    color: colors.fontBlack,
  },
  listContainer: {
    paddingBottom: 20,
  },
})

export default styles
