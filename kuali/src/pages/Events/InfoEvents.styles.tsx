import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  eventDetailsContainer: {
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 12,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  eventTitle: {
    fontFamily: 'monserratBold',
    includeFontPadding: false,
    fontSize: 24,
    color: colors.fontBlack,
  },
  eventInfoText: {
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
    fontSize: 16,
    color: colors.fontBlack,
  },
  eventInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  description: {
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
    fontSize: 16,
    lineHeight: 24,
    color: colors.fontBlack,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.borderGray,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: colors.warningRed,
    textAlign: 'center',
  },
  exitButton: {
    alignSelf: 'flex-start',
    marginTop: 30,
    paddingVertical: 8,
  },
  exitButtonText: {
    color: colors.warningRed,
    fontSize: 14,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    alignSelf: 'flex-start',
    backgroundColor: colors.highlightCyan,
    borderRadius: 8,
  },

  applyButton: {
    backgroundColor: colors.blueIcons,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 16,
    alignSelf: 'flex-start',
    textAlign: 'center',
  },
  applyButtonText: {
    color: colors.fontBlack,
    fontWeight: '600',
    fontSize: 16,
  },
  registerLimitContainer: {
    marginTop: 4,
    marginBottom: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  registerLimitLabel: {
    fontFamily: 'monserratBold',
    includeFontPadding: false,
    fontSize: 16,
    color: colors.fontBlack,
    marginBottom: 4,
  },
  registerLimitDate: {
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
    fontSize: 16,
    color: colors.fontBlack,
  },
  noRequirementsText: {
    textAlign: 'center',
    marginVertical: 20,
    fontStyle: 'italic',
    color: '#666',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.standardGray,
  },
})

export default styles
