import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Notification as NotificationType } from '../../../types/Notification'
import { FormattedDate } from '../FormattedDate/FormattedDate'
import colors from '../../../constants/colors'
import { CircleNotificationIcon } from '../Icons/Icons'

interface NotificationProps {
  notificationInfo: NotificationType
}

const Notification: React.FC<NotificationProps> = ({ notificationInfo }) => {
  return (
    <View style={styles.container}>
      <CircleNotificationIcon color={colors.highlightCyan} />
      <View style={styles.infoContainer}>
        <View style={styles.dateContainer}>
          <FormattedDate
            style={styles.date}
            showWeekday={false}
            showTime={false}
            date={new Date(notificationInfo.creation_date)}
          />
        </View>
        <Text style={styles.message}>{notificationInfo.message}</Text>
      </View>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    padding: 8,
  },
  infoContainer: {
    gap: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  date: {
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
    fontSize: 16,
    color: colors.highlightCyan,
    marginTop: 2,
  },
  title: {
    fontFamily: 'monserratBold',
    includeFontPadding: false,
    fontSize: 16,
  },
  message: {
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
    fontSize: 14,
  },
})
