import { Stack } from 'expo-router'
import { AuthProvider } from '../context/AuthContext'
import Toast from 'react-native-toast-message'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppActionsProvider } from '../context/AppActionsContext'
import { NotificationsProvider } from '../context/NotificationsContext/NotificationsContext'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppActionsProvider>
        <AuthProvider>
          <NotificationsProvider>
            <Stack screenOptions={{ headerShown: false }} />
            <Toast />
          </NotificationsProvider>
        </AuthProvider>
      </AppActionsProvider>
    </SafeAreaProvider>
  )
}
