import { StyleSheet } from 'react-native'
import colors from '../../../../constants/colors'

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  container: {
    width: '100%',
    padding: 16,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  datePickerContainer: {
    marginBottom: 16,
    borderColor: colors.borderGray,
    borderBottomWidth: 1.5,
  },
})
