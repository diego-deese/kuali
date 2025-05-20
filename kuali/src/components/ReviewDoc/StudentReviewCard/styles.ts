import { StyleSheet } from 'react-native'
import colors from '../../../constants/colors'

export default StyleSheet.create({
  card: {
    backgroundColor: colors.solidWhite,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    marginLeft: 10,
    fontSize: 16,
    marginBottom: 8,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  downloadText: {
    fontSize: 14,
    color: '#007AFF',
  },
  actions: {
    flexDirection: 'column',
  },
  buttonCompact: {
    width: '65%',
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  approved: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  rejected: {
    color: '#F44336',
    fontWeight: 'bold',
  },
})
