import React from "react"
import { View, TouchableOpacity, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import styles from "./header_styles"
import colors from "../../constants/colors"

// Definimos la interfaz para las props que recibirá nuestro componente
interface HeaderProps {
  onTabPress: (tabName: string) => void // Función que se ejecutará cuando se presione un tab
}

const Header: React.FC<HeaderProps> = ({ onTabPress }) => {
  // Obtenemos los insets para manejar el área segura
  const insets = useSafeAreaInsets()

  // Función para manejar cuando se presiona un tab
  const handleTabPress = (tabName: string) => {
    onTabPress(tabName) // Llamamos a la función que pasamos por props
  }

  return (
    // Contenedor principal de la navbar
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top > 0 ? insets.top : 10,
          height: 60 + (insets.top > 0 ? insets.top : 10),
        },
      ]}
    >
      {/* Logo CICATA */}
      <Image source={require("../../assets/CICATALogoHeader.png")} />

      {/* Tab de Notification */}
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

export default Header
