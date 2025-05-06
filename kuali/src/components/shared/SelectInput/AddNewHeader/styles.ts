import { StyleSheet } from 'react-native'
import colors from '../../../../constants/colors'

export const styles = StyleSheet.create({
  container: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: 8,
    paddingEnd: 8,
    borderBottomWidth: 2,
    borderColor: colors.borderGray,
  },
  inputContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'monserratRegular',
    fontSize: 16,
    includeFontPadding: false,
    marginStart: 8,
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
    marginStart: 4,
    marginEnd: 8,
  },
})
