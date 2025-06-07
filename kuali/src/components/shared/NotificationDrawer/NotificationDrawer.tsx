import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const NotificationItem = ({ notification }) => (
  <View style={styles.notificationItem}>
    <View
      style={[
        styles.statusDot,
        { backgroundColor: notification.isActive ? '#4CAF50' : '#CCCCCC' },
      ]}
    />
    <View style={styles.notificationContent}>
      <Text
        style={[
          styles.timeText,
          { color: notification.isActive ? '#4CAF50' : '#CCCCCC' },
        ]}
      >
        {notification.time}
      </Text>
      <Text
        style={[
          styles.titleText,
          { color: notification.isActive ? '#333333' : '#CCCCCC' },
        ]}
      >
        {notification.title}
      </Text>
    </View>
  </View>
)

const NotificationDrawer = () => {
  const [notifications] = useState([
    {
      id: 1,
      time: 'Hoy, 9:00 hrs',
      title: 'Evento ejemplo',
      isActive: true,
    },
    {
      id: 2,
      time: 'Antes del 20 de marzo, 15:00 hrs',
      title: 'Subir documentos para evento ejemplo',
      isActive: true,
    },
    {
      id: 3,
      time: '22 de marzo, 11:00 hrs',
      title: 'Evento ejemplo',
      isActive: true,
    },
  ])

  const [pastNotifications] = useState([
    {
      id: 4,
      time: '09 de marzo, 18:00 hrs',
      title: 'Evento ejemplo',
      isActive: false,
    },
  ])

  return (
    <View style={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notificaciones</Text>
      </View>

      <ScrollView
        style={styles.notificationsList}
        showsVerticalScrollIndicator={false}
      >
        {/* Notificaciones activas */}
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}

        {/* Sección de notificaciones pasadas */}
        <View style={styles.pastNotificationsSection}>
          <Text style={styles.pastNotificationsTitle}>
            Notificaciones pasadas
          </Text>
          {pastNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default NotificationDrawer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 120,
    backgroundColor: '#8E9AAF',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoText: {
    fontSize: 20,
    color: '#8E9AAF',
  },
  logoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  logoSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  bookmarkContainer: {
    alignItems: 'center',
  },
  bookmarkIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  notificationsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  titleText: {
    fontSize: 16,
    lineHeight: 20,
  },
  pastNotificationsSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  pastNotificationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#CCCCCC',
    marginBottom: 15,
  },
})
