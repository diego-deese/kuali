import { StyleSheet } from 'react-native'
import colors from '../../../constants/colors'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  navText: {
    fontFamily: 'monserrat',
    includeFontPadding: false,
    fontSize: 16,
    color: colors.blueIcons,
  },
  disabled: {
    opacity: 0.3,
  },
  pageText: {
    fontFamily: 'monserrat',
    includeFontPadding: false,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
})

export default styles
