import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.backgroundWhite,
  },
  title: {
    fontSize: 28,
    fontFamily: 'monserratBold',
    includeFontPadding: false,
    marginTop: 5,
    paddingBottom: 10,
    textAlign: 'left',
    color: colors.fontBlack,
  },
  row: {
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  docText: {
    fontSize: 17,
    fontFamily: 'monserratBold',
    includeFontPadding: false,
    marginBottom: 5,
    paddingBottom: 10,
    textAlign: 'left',
    color: colors.fontBlack,
  },
  changeText: {
    fontSize: 25,
    fontFamily: 'monserratBold',
    includeFontPadding: false,
    marginBottom: 30,
    textAlign: 'left',
    color: colors.standardGray,
  },
  dowload: {
    fontFamily: 'monserrat',
    includeFontPadding: false,
    fontSize: 20,
    marginBottom: 5,
    color: colors.selectionBlue,
  },
  list: {
    gap: 12,
    paddingBottom: 20,
  },
  noUser: {
    fontFamily: 'monserrat',
    includeFontPadding: false,
    textAlign: 'center',
    marginTop: 16,
    fontSize: 20,
  },
})

export default styles
