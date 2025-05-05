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
  },
  title: {
    fontSize: 18,
    fontFamily: 'monserratBold',
    textAlign: 'left',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: 'monserratRegular',
    color: colors.fontBlack,
    textAlign: 'left',
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    backgroundColor: '#E3E3E3',
    padding: 12,
    borderRadius: 8,
    borderColor: '#767676',
    borderWidth: 1,
  },
  confirmButton: {
    backgroundColor: colors.selectionBlue,
    padding: 12,
    borderRadius: 8,
  },
  cancelText: {
    color: colors.fontBlack,
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
  },
  confirmText: {
    color: colors.solidWhite,
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
  },
})
