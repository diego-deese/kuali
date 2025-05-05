import { StyleSheet } from 'react-native'
import colors from '../../../constants/colors'

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    position: 'relative',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 8,
    marginBottom: 8,
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
    fontSize: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    height: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.solidWhite,
    borderWidth: 1.5,
    borderColor: colors.borderGray,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  optionsContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: 10,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderColor: colors.borderGray,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    padding: 2,
    backgroundColor: colors.solidWhite,
    maxHeight: 210,
    overflow: 'hidden',
  },
  selectedOption: {
    fontFamily: 'monserratRegular',
    fontSize: 16,
    includeFontPadding: false,
    color: colors.standardGray,
  },
  emptyText: {
    fontFamily: 'monserratRegular',
    fontSize: 16,
    color: colors.standardGray,
    includeFontPadding: false,
    margin: 4,
  },
})
