import React, { useState } from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import colors from "../constants/colors"

// Definimos la interfaz para las props que recibirá nuestro componente
interface NavbarProps {
  onTabPress: (tabName: string) => void // Función que se ejecutará cuando se presione un tab
}

const Navbar: React.FC<NavbarProps> = ({ onTabPress }) => {
  // Estado para guardar el tab activo actualmente
  const [activeTab, setActiveTab] = useState("bookmark")

  // Función para manejar cuando se presiona un tab
  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName) // Actualizamos el estado local
    onTabPress(tabName) // Llamamos a la función que pasamos por props
  }

  return (
    <View style={styles.container}>
      {/* Tab de Bookmark */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleTabPress("bookmark")}
      >
        <Ionicons
          // Cambia entre el icono sólido y el outline según si está activo
          name={activeTab === "bookmark" ? "bookmark" : "bookmark-outline"}
          size={30}
          color={colors.blueIcons}
        />
      </TouchableOpacity>

      {/* Tab de Calendar */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleTabPress("calendar")}
      >
        <Ionicons
          name={activeTab === "calendar" ? "calendar" : "calendar-outline"}
          size={30}
          color={colors.blueIcons}
        />
      </TouchableOpacity>

      {/* Tab de User */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleTabPress("user")}
      >
        <Ionicons
          name={activeTab === "user" ? "person" : "person-outline"}
          size={30}
          color={colors.blueIcons}
        />
      </TouchableOpacity>
    </View>
  )
}

// Estilos navbar
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 80, // CHECAR ALTURA
    backgroundColor: "white",
    borderTopWidth: 5,
    borderTopColor: colors.highlightCyan,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
})

export default Navbar
