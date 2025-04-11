import { Stack } from "expo-router"
import { View } from "react-native"
import HorizontalLogo from "../components/Logo/Logos"

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerTitle: "",
          headerLeft: () => <HorizontalLogo />,
        }}
      />
    </View>
  )
}
