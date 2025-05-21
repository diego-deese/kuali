import { StyleSheet } from 'react-native'
import colors from '../../../constants/colors'

export default StyleSheet.create({
  card: {
    backgroundColor: colors.solidWhite,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  docName: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'column',
  },
  iconContainer: {
    //width: '20%',
    alignItems: 'center',
  },
  buttonCompact: {
    width: '65%',
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: -10,
  },
})
