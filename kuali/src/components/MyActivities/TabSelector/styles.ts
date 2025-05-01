import { StyleSheet } from 'react-native'
import colors from '../../../constants/colors'

export const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  inactiveTab: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#666',
    borderBottomWidth: 2,
    borderColor: '#666',
  },
  activeTab: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#000',
    borderBottomWidth: 2,
    borderColor: colors.highlightCyan,
  },
})
