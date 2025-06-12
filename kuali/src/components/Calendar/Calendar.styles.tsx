import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'
import { ThemeInterface } from 'react-native-big-calendar'

export const calendarTheme: ThemeInterface = {
  palette: {
    primary: {
      main: colors.highlightCyan,
      contrastText: colors.solidWhite,
    },
    nowIndicator: 'red',
    gray: {
      '100': colors.highlightCyan, // highlight (now and events)
      '200': colors.borderGray, // lines
      '300': '#888', // sabra dios pq yo no
      '500': colors.placeholderGray, // days of the previous and next month
      '800': colors.fontBlack, // days from the current month
    },
    moreLabel: colors.fontBlack,
  },
  typography: {
    fontFamily: 'monserratRegular',
    xs: {
      fontSize: 12,
      fontFamily: 'monserratRegular',
    },
    sm: {
      fontSize: 14,
      fontFamily: 'monserratRegular',
    },
    xl: { fontSize: 18, fontFamily: 'monserratBold' },
    moreLabel: {
      fontSize: 12,
      fontFamily: 'monserratRegular',
      textAlign: 'center',
    },
  },
  isRTL: false,
  eventCellOverlappings: [
    { main: '#e57373', contrastText: '#fff' },
    { main: '#64b5f6', contrastText: '#fff' },
    { main: '#81c784', contrastText: '#fff' },
    { main: '#ffd54f', contrastText: '#000' },
  ],
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  calendarWrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 10,
    justifyContent: 'space-between',
  },
  monthContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  headerText: {
    fontSize: 32,
    color: colors.fontBlack,
    fontFamily: 'monserratBold',
    includeFontPadding: false,
  },
  headerMonth: {
    fontSize: 32,
    color: colors.placeholderGray,
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
  },
  headerYear: {
    fontSize: 32,
    fontFamily: 'monserratItalic',
    includeFontPadding: false,
    color: colors.highlightCyan,
    textAlign: 'center',
  },
})

export default calendarTheme
