import { StyleSheet } from 'react-native'
import colors from '../../../../constants/colors'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    backgroundColor: colors.solidWhite,
    borderColor: colors.borderGray,
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 16,
    marginBottom: 8,
  },
  header: {
    fontFamily: 'monserratBold',
    fontSize: 16,
    maxWidth: 200,
  },
  iconButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: colors.selectionBlue,
    alignSelf: 'flex-end',
  },
})
