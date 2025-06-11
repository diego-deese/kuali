import React, { createContext, useContext } from 'react'
import { Notification } from '../../types/Notification'
import { useNotifications } from './useNotifications'

interface NotificationsContextProps {
  notifications: Notification[]
  notificationsDrawer: {
    showDrawer: boolean
    toggleShowDrawer: () => void
    getUserNotifications: () => Promise<void>
    loadingNotifications: boolean
  }
}

const NotificationsContext = createContext<NotificationsContextProps>({
  notifications: [],
  notificationsDrawer: {
    showDrawer: false,
    toggleShowDrawer: () => {},
    getUserNotifications: async () => {},
    loadingNotifications: false,
  },
})

export const useNotificationsContext = () => {
  const context = useContext(NotificationsContext)

  if (context === undefined) {
    throw new Error(
      'useNotificationsContext must be used within a NotificationsContextProvider',
    )
  }

  return context
}

interface NotificationsProviderProps {
  children: React.ReactNode
}

export const NotificationsProvider = ({
  children,
}: NotificationsProviderProps) => {
  const value = useNotifications()

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  )
}
