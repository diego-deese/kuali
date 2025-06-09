import { useEffect, useState } from 'react'
import { Notification } from '../../types/Notification'
import notificationService from '../../services/notification.service'
import Toast from 'react-native-toast-message'

export const useNotifications = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])

  const toggleShowDrawer = (): void => {
    setShowDrawer(!showDrawer)
  }

  const getUserNotifications = async (): Promise<void> => {
    try {
      const result = await notificationService.getUserNotifications()

      if (!result.success && 'error' in result) {
        Toast.show({
          type: 'error',
          text1: result.message,
          text2: result.error,
        })
        return
      }

      setNotifications(result.data)
    } catch (error) {
      console.log(error)
      Toast.show({
        type: 'error',
        text1: 'Error al obtener las notificaciones',
        text2: 'Por favor intenta de nuevo más tarde',
      })
      setNotifications([])
    }
  }

  useEffect(() => {
    getUserNotifications()
  }, [])

  return {
    notifications: notifications ?? [],
    notificationsDrawer: {
      showDrawer,
      toggleShowDrawer,
    },
  }
}
