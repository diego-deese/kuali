import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingTop: 40,
    paddingLeft: 25,
  },
  imagePlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: colors.highlightCyan,
    marginTop: 24,
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.fontBlack,
  },
  idContainer: {
    backgroundColor: colors.highlightCyan,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  idText: {
    color: colors.solidWhite,
    fontWeight: 'bold',
  },
  role: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.fontBlack,
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
    color: colors.fontBlack,
    textAlign: 'center',
  },
})

export default styles
