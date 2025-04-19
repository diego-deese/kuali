import { Text } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function MyStudents() {
  return (
    <SafeAreaProvider>
      <Text>MyStudents</Text>
    </SafeAreaProvider>
  )
}
