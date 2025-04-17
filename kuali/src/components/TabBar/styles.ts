import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundWhite,
    paddingVertical: 16,
    borderTopColor: colors.highlightCyan,
    borderTopWidth: 4,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default styles
