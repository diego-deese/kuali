import { Text, View } from "react-native"
import { useFonts } from "expo-font"
import ProfileId from "./pages/ProfileId/profileId"
import MyActivities from "./pages/MyActivities/myActivities"

export default function App() {
  const [fontsLoaded] = useFonts({
    monserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
    monserratBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
    monserratItalic: require("./assets/fonts/Montserrat-Italic.ttf"),
  })

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading Fonts...</Text>
      </View>
    )
  }

  return (
    <View>
      <MyActivities />
    </View>
  )
}
