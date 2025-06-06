import { StyleSheet } from 'react-native'
import colors from '../../../constants/colors'

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.backgroundWhite,
    padding: 15,
    paddingVertical: 10,
    borderRadius: 10,
    width: '90%',
    elevation: 5,
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'monserratBold',
    textAlign: 'left',
    includeFontPadding: false,
  },
  cancelText: {
    fontSize: 12,
    fontFamily: 'monserratBold',
    textAlign: 'center',
    includeFontPadding: false,
    color: colors.warningRed,
    padding: 10,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'monserratItalic',
    textAlign: 'center',
  },
})
