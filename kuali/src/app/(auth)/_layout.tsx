import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Oculta el header
        // Puedes añadir otras opciones de Stack según necesites
      }}
    />
  )
}
