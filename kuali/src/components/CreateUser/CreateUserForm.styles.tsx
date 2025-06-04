import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  imgSection: {
    alignItems: 'center',
  },
  imgContainer: {
    borderWidth: 2,
    borderColor: colors.highlightCyan,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  uploadBtnContainer: {
    width: '60%',
    alignSelf: 'center',
    paddingTop: 15,
  },
})

export default styles
