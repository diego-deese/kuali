import { Stack } from 'expo-router'
import { AuthProvider } from '../context/AuthContext'
import Toast from 'react-native-toast-message'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppActionsProvider } from '../context/AppActionsContext'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppActionsProvider>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }} />
          <Toast />
        </AuthProvider>
      </AppActionsProvider>
    </SafeAreaProvider>
  )
}
