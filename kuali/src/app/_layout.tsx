// app/_layout.js
import { Stack } from 'expo-router'
import { AuthProvider, useAuth } from '../context/AuthContext'
import LoadingScreen from '../pages/LoadingScreen/LoadingScreen'

// Componente envuelto en el proveedor de autenticación
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  )
}

// Navegación basada en el estado de autenticación
function RootLayoutNav() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (isAuthenticated) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    )
  } else {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
      </Stack>
    )
  }
}
