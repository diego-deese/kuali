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
    includeFontPadding: false,
    fontSize: 16,
  },
  inputText: {
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontFamily: 'monserratRegular',
    fontSize: 16,
    backgroundColor: colors.solidWhite,
    borderColor: colors.borderGray,
    borderWidth: 1.5,
    includeFontPadding: false,
    color: colors.fontBlack,
    height: 45,
  },
  inputTextMultiline: {
    padding: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  inputTextIcon: {
    paddingRight: 45,
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
  errorText: {
    color: colors.warningRed,
    fontFamily: 'monserratRegular',
    fontSize: 16,
    marginTop: 4,
    marginStart: 8,
  },
})

export default styles
