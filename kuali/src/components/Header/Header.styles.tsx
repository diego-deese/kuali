import { StyleSheet } from 'react-native'

// Estilos header
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tabButton: {
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default styles
