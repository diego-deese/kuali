import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  card: {
    height: 20,
    backgroundColor: colors.highlightCyan,
    borderRadius: 3,
    padding: 4,
  },
  title: {
    color: 'white',
    fontFamily: 'monserratRegular',
    fontSize: 8,
  },
})

export default styles
