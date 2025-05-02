import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarContainer: {
    flex: 1,
  },
  textNextEvents: {
    fontFamily: 'monserratBold',
    fontSize: 24,
  },
  nextEventsContainer: {
    flex: 100, // xd
    padding: 10,
  },
  nextEventsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
})

export default styles
