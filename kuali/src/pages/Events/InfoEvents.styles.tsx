import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.fontBlack,
  },
  eventInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventInfoIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  eventInfoText: {
    fontSize: 16,
    color: '#555555',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.fontBlack,
    marginTop: 16,
    marginBottom: 24,
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
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  registerLimitLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.fontBlack,
    marginBottom: 4,
  },
  registerLimitDate: {
    fontSize: 16,
    color: colors.fontBlack,
  },
  noRequirementsText: {
    textAlign: 'center',
    marginVertical: 20,
    fontStyle: 'italic',
    color: '#666',
  },
})

export default styles
