import React from 'react'
import { View, Text } from 'react-native'
import { useFonts } from 'expo-font'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function App() {
  const [fontsLoaded] = useFonts({
    monserratRegular: require('./assets/fonts/Montserrat-Regular.ttf'),
    monserratBold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
    monserratItalic: require('./assets/fonts/Montserrat-Italic.ttf'),
  })
  if (!fontsLoaded) {
    return (
      <View>
        <Text>Fonts Loading...</Text>
      </View>
    )
  }
  return <SafeAreaProvider></SafeAreaProvider>
}
