import { StyleSheet } from 'react-native'
import colors from './colors'

export const datePickerStyles = StyleSheet.create({
  // Days
  selected: {
    backgroundColor: colors.selectionBlue,
    borderRadius: 10,
  },
  selected_label: {
    color: colors.solidWhite,
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
  },
  today: {
    borderColor: colors.highlightCyan,
    borderWidth: 1.5,
    borderRadius: 10,
  },
  day_label: {
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
  },
  weekday_label: {
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
  },
  weekdays: {
    height: 32,
    borderColor: colors.highlightCyan,
    borderBottomWidth: 1.5,
    paddingBottom: 4,
  },

  // Months
  month: {
    borderColor: colors.inactiveGray,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  month_label: {
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
  },
  month_selector_label: {
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
    margin: 8,
  },
  selected_month: {
    borderColor: colors.highlightCyan,
    borderWidth: 1.5,
    borderRadius: 10,
  },

  // Years
  year: {
    borderColor: colors.inactiveGray,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  year_selector_label: {
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
  },
  selected_year: {
    borderColor: colors.highlightCyan,
    borderWidth: 1.5,
  },
  active_year: {
    backgroundColor: colors.selectionBlue,
  },
  active_year_label: {
    color: colors.solidWhite,
  },

  // Time
  time_label: {
    fontSize: 24,
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
  },
  time_selector_label: {
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
  },
  time_selected_indicator: {
    // backgroundColor: colors.borderGray,
    borderRadius: 10,
    borderColor: colors.highlightCyan,
    borderWidth: 1.5,
  },

  // UI
  button_next: {
    borderColor: colors.borderGray,
    borderWidth: 1.5,
    borderRadius: 10,
  },
  button_next_image: {
    tintColor: colors.highlightCyan,
    width: 20,
    height: 20,
    margin: 4,
  },
  button_prev_image: {
    tintColor: colors.highlightCyan,
    width: 20,
    height: 20,
    margin: 4,
  },
  button_prev: {
    borderColor: colors.borderGray,
    borderWidth: 1.5,
    borderRadius: 10,
  },
  disabled_label: {
    color: colors.placeholderGray,
  },
  header: {
    marginBottom: 8,
  },
})
