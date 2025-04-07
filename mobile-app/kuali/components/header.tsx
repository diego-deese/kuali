import React from "react"
import { View, TouchableOpacity, StyleSheet, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import colors from "../constants/colors"

// Definimos la interfaz para las props que recibirá nuestro componente
interface HeaderProps {
  onTabPress: (tabName: string) => void // Función que se ejecutará cuando se presione un tab
}

const Header: React.FC<HeaderProps> = ({ onTabPress }) => {
  // Función para manejar cuando se presiona un tab
  const handleTabPress = (tabName: string) => {
    onTabPress(tabName) // Llamamos a la función que pasamos por props
  }

  return (
    // Contenedor principal de la navbar
    <View style={styles.container}>
      {/* Tab de Notification */}
      <Image source={require("../assets/CICATALogoHeader.png")} />
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleTabPress("notificacion")}
      >
        <Ionicons
          name={"notifications-outline"}
          size={25}
          color={colors.blueIcons}
        />
      </TouchableOpacity>
    </View>
  )
}

// Estilos header
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 80, // CHECAR ALTURA
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  tabButton: {
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default Header
