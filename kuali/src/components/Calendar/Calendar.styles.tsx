import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const calendarTheme = {
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
        '800': colors.fontBlack // days from the current month
      },
    },

    styles: StyleSheet.create({
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            gap: 10,
        },
        headerText: {
            fontSize: 32,
            color: colors.fontBlack,
            fontWeight: '600',
        },
        headerMonth: {
            fontSize: 32,
            color: colors.placeholderGray,
            fontWeight: '600',
        }
      }),
  }

export default calendarTheme
  

  