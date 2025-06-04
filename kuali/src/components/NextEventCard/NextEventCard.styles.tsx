import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.solidWhite,
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    width: '95%',
    alignSelf: 'center',
    position: 'relative',
    overflow: 'hidden',
    elevation: 2,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    gap: 50,
  },
  eventInfo: {
    flexShrink: 1,
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  eventTitle: {
    fontSize: 18,
    fontFamily: 'monserratBold',
    includeFontPadding: false,
  },
  eventMoreInfo: {
    fontSize: 14,
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
  },
  buttonContainer: {
    gap: 10,
    alignContent: 'flex-end',
    flexShrink: 0,
  },
})

export default styles
