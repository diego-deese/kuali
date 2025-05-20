import { StyleSheet } from 'react-native'
import colors from '../../../constants/colors'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '100%',
    justifyContent: 'space-between',
    width: '90%',
  },
  text: {
    fontSize: 16,
    color: colors.standardGray,
  },
})
