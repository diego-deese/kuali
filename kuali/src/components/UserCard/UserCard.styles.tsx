import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.solidWhite,
    borderRadius: 10,
    padding: 25,
    marginVertical: 8,
    width: '85%',
    alignSelf: 'center',
    flexDirection: 'row',
    position: 'relative',
    overflow: 'hidden',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inactiveOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.inactiveGray,
    opacity: 0.4,
    borderRadius: 10,
  },
  content: {
    flexDirection: 'row',
    width: '100%',
  },
  nameContainer: {
    flex: 1,
    width: '40%',
  },
  name: {
    fontFamily: 'monserratBold',
    fontSize: 16,
    color: colors.fontBlack,
  },
  nameInactive: {
    fontFamily: 'monserratBold',
    fontSize: 16,
    color: colors.fontBlack,
    opacity: 0.6,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 10,
    alignContent: 'flex-end',
  },
})

export default styles
