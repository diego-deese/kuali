import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.solidWhite,
    borderRadius: 8,
    padding: 24,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  headerText: {
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: 'monserratBold',
    includeFontPadding: false,
  },
  description: {
    fontSize: 14,
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
    color: colors.standardGray,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
})

export default styles
