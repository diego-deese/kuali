import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Button,
} from "react-native"
import React from "react"
import styles from "./login.styles"
import colors from "../../constants/colors"

export default function LogIn() {
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
        />
        <Text style={styles.inputLabels}>Contraseña</Text>
        <TextInput
          placeholder="***************"
          placeholderTextColor={colors.placeholderGray}
          style={styles.inputText}
        />
      </View>
      <Button title="Iniciar sesión" color={colors.selectionBlue} />
      <View></View>
    </SafeAreaView>
  )
}
