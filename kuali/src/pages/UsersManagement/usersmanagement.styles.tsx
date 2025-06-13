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
    justifyContent: 'space-between',
    paddingEnd: 30,
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
    gap: 8,
    marginBottom: 8,
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

  textLoading: {
    fontFamily: 'monserratRegular',
    fontSize: 15,
    color: colors.standardGray,
    textAlign: 'center',
  },

  textError: {
    fontFamily: 'monserratRegular',
    fontSize: 15,
    color: colors.warningRed,
    textAlign: 'center',
    padding: 20,
  },
})

export default styles
