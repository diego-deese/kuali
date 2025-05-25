import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

export default StyleSheet.create({
  card: {
    minHeight: 80,
    justifyContent: 'center',
    backgroundColor: colors.solidWhite,
    borderRadius: 10,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'column',
  },
  iconContainer: {
    //flex: 1,
    alignItems: 'center',
    marginRight: 15,
  },
  buttonCompact: {
    width: '65%',
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: -10,
  },
  approved: {
    width: '30%',
    color: colors.blueIcons,
    fontWeight: 'bold',
    fontSize: 17,
  },
  rejected: {
    width: '30%',
    color: '#F44336',
    fontWeight: 'bold',
    fontSize: 17,
  },
})
