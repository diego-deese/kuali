import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '10%',
    padding: 20,
    gap: 50,
  },
  title: {
    fontFamily: 'monserratBold',
    fontSize: 24,
    alignSelf: 'flex-start',
  },
  tabs: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  inactiveTab: {
    fontFamily: 'monserratRegular',
    fontSize: 15,
    paddingVertical: 8,
    color: colors.standardGray,
    borderBottomWidth: 2,
    borderColor: colors.standardGray,
  },

  activeTab: {
    fontFamily: 'monserratRegular',
    fontSize: 15,
    paddingVertical: 8,
    color: colors.fontBlack,
    borderBottomWidth: 2,
    borderColor: colors.highlightCyan,
  },
})

export default styles
