import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontFamily: 'monserratRegular',
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 24,
    width: '100%',
  },
  button: {
    fontSize: 16,
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
