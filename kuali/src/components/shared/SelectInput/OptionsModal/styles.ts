import { StyleSheet } from 'react-native'
import colors from '../../../../constants/colors'

export const styles = StyleSheet.create({
  optionsOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    maxHeight: 340,
    overflow: 'hidden',
    width: '90%',
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderColor: colors.borderGray,
    borderRadius: 8,
    padding: 2,
    backgroundColor: colors.solidWhite,
  },
})
