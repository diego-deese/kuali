import { Stack } from 'expo-router'
import Header from '../../components/shared/Header/Header'

export default function EventLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => <Header onTabPress={() => {}} />,
      }}
    />
  )
}
