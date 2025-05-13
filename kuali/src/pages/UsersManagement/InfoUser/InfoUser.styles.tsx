import { StyleSheet } from 'react-native'
import colors from '../../../constants/colors'

const styles = StyleSheet.create({
  titleContainer: {
    padding: 20,
  },
  title: {
    fontFamily: 'monserratBold',
    fontSize: 24,
  },
  infoContainer: {
    paddingLeft: 20,
    gap: 10,
  },
  atributeTitle: {
    color: colors.backgroundWhite,
    fontFamily: 'monserratBold',
    fontSize: 16,
    backgroundColor: colors.highlightCyan,
    padding: 10,
    borderRadius: 4,
    textAlign: 'left',
    width: '60%',
    height: '10%',
  },
  atributeValue: {
    fontFamily: 'monserratRegular',
    fontSize: 16,
  },
})

export default styles
