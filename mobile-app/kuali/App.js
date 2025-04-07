import { SafeAreaView, Text, View, StyleSheet } from "react-native"
import { useFonts } from "expo-font"
import ProfileId from "./pages/ProfileId/profileId"
import Navbar from "./components/navbar"
import Header from "./components/header"
import LogIn from "./pages/Login/login"

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header onTabPress={(tabName) => console.log(tabName)} />
      </View>
      <View style={styles.content}>
        <ProfileId />
      </View>
      <View style={styles.footer}>
        <Navbar onTabPress={(tabName) => console.log(tabName)} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  header: {},
})
