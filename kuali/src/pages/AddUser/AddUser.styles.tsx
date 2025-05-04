import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    display: 'flex',
  },
  title: {
    fontFamily: 'monserratBold',
    fontSize: 24,
  },
  inputsContainer: {
    flex: 1,
    paddingTop: 20,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    alignSelf: 'flex-end',
  },
})

export default styles
