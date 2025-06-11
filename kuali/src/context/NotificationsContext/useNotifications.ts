import { useCallback, useEffect, useState } from 'react'
import { Notification } from '../../types/Notification'
import notificationService from '../../services/notification.service'
import Toast from 'react-native-toast-message'
import { useAuth } from '../AuthContext'
import { Roles } from '../../constants/roles'
import { useAppActions } from '../AppActionsContext'

export const useNotifications = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])

  const REFRESH_INTERVAL = 900000

  const { user, authenticated } = useAuth()

  const { requests } = useAppActions()

  const [loadingNotifications, setLoadingNotifications] = useState(false)

  const toggleShowDrawer = (): void => {
    setShowDrawer(!showDrawer)
  }

  const getUserNotifications = useCallback(async (): Promise<void> => {
    requests.toggleIsSendingRequest(true)
    setLoadingNotifications(true)
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
    } finally {
      requests.toggleIsSendingRequest(false)
      setLoadingNotifications(false)
    }
  }, [requests])

  useEffect(() => {
    if (requests.isSendingRequest || !authenticated) return

    if (user?.role.role_id !== Roles.ADMIN) {
      setNotifications([])
      getUserNotifications()

      const interval = setInterval(() => {
        getUserNotifications()
      }, REFRESH_INTERVAL)

      return () => clearInterval(interval)
    }
  }, [authenticated, requests, user])

  return {
    notifications: notifications ?? [],
    notificationsDrawer: {
      showDrawer,
      toggleShowDrawer,
      getUserNotifications,
      loadingNotifications,
    },
  }
}
