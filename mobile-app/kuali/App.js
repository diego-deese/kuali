import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { useFonts } from "expo-font"
import LogIn from "./pages/Login/login"
import colors from "./constants/colors"
import ProfileId from "./pages/ProfileId/profileId"

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
      <ProfileId />
    </View>
  )
}
