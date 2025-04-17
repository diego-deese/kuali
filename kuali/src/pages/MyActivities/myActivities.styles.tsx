import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },

  inactiveTab: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#666',
    borderBottomWidth: 2,
    borderColor: '#666',
  },

  activeTab: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#000',
    borderBottomWidth: 2,
    borderColor: '#3cb4ac',
  },

  eventList: {
    marginTop: 10,
  },
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
  toggleButton: {
  flexDirection: "row",
  backgroundColor: "#3cb4ac",
  padding: 10,
  borderRadius: 8,
  alignSelf: "flex-end",
  margin: 10,
},
toggleText: {
  color: "#fff",
  fontSize: 14,
  fontWeight: "bold",
}

})

export default styles
