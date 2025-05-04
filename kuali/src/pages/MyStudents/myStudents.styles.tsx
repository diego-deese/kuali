import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: colors.solidWhite,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.fontBlack,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.solidWhite,
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.fontBlack,
  },
  project: {
    marginTop: 4,
    fontSize: 14,
    color: colors.standardGray,
  },
})

export default styles
