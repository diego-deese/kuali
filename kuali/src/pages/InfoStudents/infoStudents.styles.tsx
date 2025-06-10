import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingTop: 40,
    paddingLeft: 25,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginTop: 24,
    marginBottom: 24,
  },
  imagePlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: colors.highlightCyan,
    marginTop: 24,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagetext: {
    fontFamily: 'monserrat',
    includeFontPadding: false,
    fontSize: 17,
    color: colors.fontBlack,
    textAlign: 'center',
  },
  name: {
    fontSize: 30,
    fontFamily: 'monserratBold',
    includeFontPadding: false,
    marginBottom: 8,
    color: colors.fontBlack,
  },
  idContainer: {
    backgroundColor: colors.highlightCyan,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  idText: {
    fontFamily: 'monserrat',
    includeFontPadding: false,
    fontSize: 18,
    color: colors.solidWhite,
  },
  role: {
    fontSize: 17,
    fontFamily: 'monserratBold',
    includeFontPadding: false,
    marginBottom: 8,
    color: colors.fontBlack,
  },
  info: {
    fontFamily: 'monserrat',
    includeFontPadding: false,
    fontSize: 17,
    marginBottom: 4,
    color: colors.fontBlack,
    textAlign: 'center',
  },
})

export default styles
