import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  backgroundImage: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 10,
  },
  eventTitle: {
    color: '#fff',
    fontSize: 32,
    fontFamily: 'monserratBold',
    includeFontPadding: false,
  },
  eventMeta: {
    marginTop: 5,
  },
  metaItem: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  metaText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
  },
})
