import { Dimensions } from "react-native"
import { EdgeInsets } from "react-native-safe-area-context"

export const calculateDimensions = (insets: EdgeInsets) => {
  const { width, height } = Dimensions.get("window")
  const headerHeight = 60 + (insets.top > 0 ? insets.top : 10)
  const tabBarHeight = 80

  // Espacio disponible = altura total - (header + tabbar + espacio seguro)
  const availableHeight =
    height - headerHeight - tabBarHeight - insets.bottom - 40 // 40px de margen

  const cardDimensions = {
    width: width * 0.85,
    height: availableHeight * 0.85, // Ocupo el 85% del espacio que sobra
  }

  // Calcular tamaños responsivos para componentes internos
  // ola said si ves esto
  const imageSize = Math.min(cardDimensions.width * 0.35, 150)
  const fontSize = {
    name: Math.min(cardDimensions.width * 0.09, 32),
    identifier: Math.min(cardDimensions.width * 0.06, 20),
    role: Math.min(cardDimensions.width * 0.055, 20),
    program: Math.min(cardDimensions.width * 0.055, 20),
    label: Math.min(cardDimensions.width * 0.035, 12),
    value: Math.min(cardDimensions.width * 0.045, 16),
  }

  return {
    cardDimensions,
    imageSize,
    fontSize,
  }
}
