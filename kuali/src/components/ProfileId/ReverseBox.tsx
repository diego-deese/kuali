import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import colors from '../../constants/colors'

interface BlackBoxProps {
  width?: number
  height?: number
  marginTop?: number
  top?: number | 'auto'
  bottom?: number
  right?: number
  style?: ViewStyle
  children?: React.ReactNode
  cardDimensions?: { width: number; height: number }
}

const BlackBox: React.FC<BlackBoxProps> = ({
  width,
  height,
  marginTop = 0,
  top = 'auto',
  bottom = 10,
  right = 0,
  style,
  children,
  cardDimensions,
}) => {
  // Si se proporciona cardDimensions, usarlos para calcular tamaños relativos
  const boxWidth = width || (cardDimensions ? cardDimensions.width * 0.15 : 50)
  const boxHeight =
    height || (cardDimensions ? cardDimensions.height * 0.08 : 50)

  return (
    <View
      style={[
        styles.box,
        {
          width: boxWidth,
          height: boxHeight,
          marginTop,
          position:
            top !== undefined || right !== undefined || bottom !== undefined
              ? 'absolute'
              : 'relative',
          top,
          bottom,
          right,
        },
        styles.shadow, // Aplicar sombra predeterminada
        style, // Estilos personalizados que pueden sobrescribir los predeterminados
      ]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.highlightCyan,
    borderRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
})

export default BlackBox
