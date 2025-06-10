import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

export default StyleSheet.create({
  card: {
    minHeight: 87,
    justifyContent: 'center',
    backgroundColor: colors.solidWhite,
    borderRadius: 10,
    elevation: 2,
  },
  row: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    flex: 1,
    fontFamily: 'monserratBold',
    includeFontPadding: false,
    marginLeft: 10,
    fontSize: 15,
    flexShrink: 1,
    flexWrap: 'wrap',
    paddingRight: 70,
  },
  actions: {
    flexDirection: 'column',
  },
  iconContainer: {
    position: 'absolute',
    left: '50%',
    zIndex: 1,
  },
  buttonCompact: {
    width: '57%',
    paddingVertical: 7,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  approved: {
    color: colors.blueIcons,
    fontFamily: 'monserratBold',
    includeFontPadding: false,
    fontSize: 17,
    marginRight: 30,
  },
  rejected: {
    color: '#F44336',
    fontFamily: 'monserratBold',
    includeFontPadding: false,
    fontSize: 17,
    marginRight: 30,
  },
})
