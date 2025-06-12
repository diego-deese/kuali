import { StyleSheet } from 'react-native'
import colors from '../../../../constants/colors'

export const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    gap: 4,
    minHeight: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.solidWhite,
    paddingVertical: 8,
    paddingEnd: 8,
    borderBottomColor: colors.borderGray,
    borderBottomWidth: 1,
  },
  labelContainer: {
    flex: 1,
    width: '100%',
    textAlignVertical: 'center',
    padding: 8,
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  input: {
    height: 40,
    width: 'auto',
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
    fontSize: 16,
    color: colors.fontBlack,
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: 8,
    paddingHorizontal: 4,
    marginHorizontal: 4,
  },
  label: {
    textAlignVertical: 'center',
    fontFamily: 'monserratRegular',
    fontSize: 16,
    includeFontPadding: false,
    color: colors.fontBlack,
    marginStart: 8,
  },
})
