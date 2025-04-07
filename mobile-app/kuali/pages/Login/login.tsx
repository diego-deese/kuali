import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Button,
  Alert
} from "react-native"
import React, { useState } from "react"
import styles from "./login.styles"
import colors from "../../constants/colors"

export default function LogIn() {
  const [institutional_email, setInstitutional_email] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const response = await fetch('http://172.20.192.1:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({institutional_email, password })
      })

      const data = await response.json()

      if (response.status === 200) {
        Alert.alert(':D')
      } else {
        Alert.alert(data.message)
      }
    } catch (error) {
      console.error(error)
      Alert.alert('ño')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={require("../../assets/cicataLogo.png")} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Ingresa con tus</Text>
        <Text style={styles.title}>credenciales</Text>
      </View>
      <View style={styles.inputsContainer}>
        <Text style={styles.inputLabels}>Correo electrónico</Text>
        <TextInput
          placeholder="Correo electrónico"
          placeholderTextColor={colors.placeholderGray}
          style={styles.inputText}
          value={institutional_email}
          onChangeText={setInstitutional_email}
        />
        <Text style={styles.inputLabels}>Contraseña</Text>
        <TextInput
          placeholder="***************"
          placeholderTextColor={colors.placeholderGray}
          style={styles.inputText}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button title="Iniciar sesión" color={colors.selectionBlue} onPress={handleLogin}/>
      <View></View>
    </SafeAreaView>
  )
}

