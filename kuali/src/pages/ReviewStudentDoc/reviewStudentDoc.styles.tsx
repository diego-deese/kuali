import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.backgroundWhite,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'left',
    color: colors.fontBlack,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  docText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
    color: colors.fontBlack,
  },
  changeText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'left',
    color: colors.standardGray,
  },
  dowload: {
    fontSize: 17,
    marginBottom: 5,
    textAlign: 'left',
    color: colors.selectionBlue,
  },
  list: {
    gap: 12,
    paddingBottom: 20,
  },
})

export default styles
