import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
    marginVertical: 8,

    width: '85%',
    alignSelf: 'center',

    //Shadows
    elevation: 2, // sombra para Android
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontFamily: 'monserratBold',
    fontSize: 20,
    marginBottom: 4,
    color: colors.fontBlack,
  },
  date: {
    color: '#666',
    fontSize: 14,
  },
})

export default styles
