import { StyleSheet } from 'react-native'
import colors from '../../../constants/colors'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  inputLabels: {
    alignSelf: 'flex-start',
    marginLeft: 8,
    marginBottom: 8,
    fontFamily: 'monserratRegular',
    fontSize: 16,
  },
  inputText: {
    width: '100%',
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontFamily: 'monserratRegular',
    fontSize: 16,
    backgroundColor: colors.solidWhite,
    borderColor: colors.borderGray,
    borderWidth: 1.5,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  inputTextIcon: {
    width: '100%',
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontFamily: 'monserratRegular',
    fontSize: 16,
    backgroundColor: colors.solidWhite,
    borderColor: colors.borderGray,
    borderWidth: 1.5,
    paddingRight: 45,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  icon: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 12,
  },
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
    marginStart: 5,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
  },
})

export default styles
