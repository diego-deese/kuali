import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Animated,
  ActivityIndicator,
} from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useNotificationsContext } from '../../../context/NotificationsContext/NotificationsContext'
import Notification from './Notification'
import { ReloadIcon } from '../Icons/Icons'
import colors from '../../../constants/colors'
import IconButton from '../IconButton/IconButton'

interface NotificationDrawerProps {
  visible: boolean
}

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  visible = false,
}) => {
  const { notifications, notificationsDrawer } = useNotificationsContext()
  const slideAnim = useRef(new Animated.Value(1000)).current

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: 1000,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      notificationsDrawer.toggleShowDrawer()
    })
  }

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      slideAnim.setValue(1000)
    }
  }, [visible, slideAnim])

  return (
    <Modal transparent visible={visible}>
      <View style={styles.background}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.contentContainer,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Notificaciones</Text>
            <IconButton
              icon={<ReloadIcon size={28} color={colors.highlightCyan} />}
              onPress={() => notificationsDrawer.getUserNotifications()}
            />
          </View>

          <View style={styles.notificationsContainer}>
            {notificationsDrawer.loadingNotifications ? (
              <ActivityIndicator size='large' color={colors.selectionBlue} />
            ) : (
              <FlatList
                contentContainerStyle={{ paddingBottom: 16 }}
                data={notifications}
                keyExtractor={(item) => item.notification_id.toString()}
                renderItem={({ item }) => (
                  <Notification notificationInfo={item} />
                )}
              />
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  )
}

export default NotificationDrawer

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentContainer: {
    backgroundColor: colors.backgroundWhite,
    width: '65%',
    alignSelf: 'flex-end',
    height: '100%',
    padding: 8,
  },
  notificationsContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: colors.borderGray,
  },
  header: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  headerTitle: {
    fontFamily: 'monserratBold',
    includeFontPadding: false,
    fontSize: 24,
  },
})
