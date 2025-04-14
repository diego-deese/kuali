import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'monserratRegular',
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 30,
  },
  inputsContainer: {
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
    marginStart: 5,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
  },
})

export default styles
