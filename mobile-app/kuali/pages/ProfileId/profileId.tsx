import React, { useState, useEffect } from "react"
import colors from "../../constants/colors"
import { SafeAreaView, View, Image, Text, Dimensions } from "react-native"
import styles from "./profileId.styles"
import { LinearGradient } from "expo-linear-gradient"
import FlipCard from "react-native-flip-card"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const user = {
  name: "Juan Pablo",
  paternal_lastname: "Escobar",
  maternal_lastname: "Juarez",
  curp: "BURD040804MMSCVLA1",
  identifier: "A01424009",
  role: "Student",
  institutionalEmail: "a01425452@tec.mx",
  personalEmail: "mucast8@gmail.com",
  program: "ITC",
  photo: require("../../assets/cicataLogo.png"),
}

export default function ProfileId() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [cardDimensions, setCardDimensions] = useState({ width: 0, height: 0 })
  const insets = useSafeAreaInsets()

  // Calcular las dimensiones
  useEffect(() => {
    const updateDimensions = () => {
      const { width, height } = Dimensions.get("window")
      const headerHeight = 60 + (insets.top > 0 ? insets.top : 10)
      const tabBarHeight = 80

      // Espacio disponible = altura total - (header + tabbar + espacio seguro)
      const availableHeight =
        height - headerHeight - tabBarHeight - insets.bottom - 40 // 40px de margen

      setCardDimensions({
        width: width * 0.85,
        height: availableHeight * 0.85, // Ocupo el 85% del espacio que sobra
      })
    }

    updateDimensions()

    // Escuchar cambios de dimensiones (rotación de pantalla)
    Dimensions.addEventListener("change", updateDimensions)

    return () => {
      // Limpiar listener cuando se desmonta el componente
      const dimensionsHandler = Dimensions.addEventListener("change", () => {})
      dimensionsHandler.remove()
    }
  }, [insets])

  // Calcular tamaños responsivos para componentes internos
  const imageSize = Math.min(cardDimensions.width * 0.35, 150)
  const fontSize = {
    name: Math.min(cardDimensions.width * 0.09, 32),
    identifier: Math.min(cardDimensions.width * 0.06, 20),
    role: Math.min(cardDimensions.width * 0.055, 20),
    program: Math.min(cardDimensions.width * 0.055, 20),
    label: Math.min(cardDimensions.width * 0.035, 12),
    value: Math.min(cardDimensions.width * 0.045, 16),
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.flipCardContainer,
          {
            height: cardDimensions.height,
            width: cardDimensions.width,
            paddingTop: 0,
          },
        ]}
      >
        <FlipCard
          friction={6}
          onFlipEnd={(isFlippedStatus) => {
            if (isFlipped !== isFlippedStatus) {
              setIsFlipped(isFlippedStatus)
            }
          }}
        >
          {/* Cara frontal */}
          <View
            style={[
              styles.card,
              { width: cardDimensions.width, height: cardDimensions.height },
            ]}
          >
            <LinearGradient
              colors={[colors.highlightCyan, colors.selectionBlue]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.gradient,
                { height: cardDimensions.height * 0.22 },
              ]}
            />
            <View
              style={[
                styles.imageContainer,
                {
                  width: imageSize,
                  height: imageSize,
                  borderRadius: imageSize / 2,
                  top: cardDimensions.height * 0.1,
                },
              ]}
            >
              <Image
                source={user.photo}
                style={[
                  styles.image,
                  {
                    width: imageSize * 0.9,
                    height: imageSize * 0.9,
                  },
                ]}
              />
            </View>
            <View
              style={[styles.info, { marginTop: cardDimensions.height * 0.38 }]}
            >
              <Text style={[styles.names, { fontSize: fontSize.name }]}>
                {user.name} {user.paternal_lastname}
              </Text>
              <Text
                style={[
                  styles.identifier,
                  {
                    fontSize: fontSize.identifier,
                    marginTop: cardDimensions.height * 0.04,
                  },
                ]}
              >
                {user.identifier}
              </Text>
              <Text
                style={[
                  styles.role,
                  {
                    fontSize: fontSize.role,
                    marginTop: cardDimensions.height * 0.04,
                  },
                ]}
              >
                {user.role}
              </Text>
              <Text
                style={[
                  styles.program,
                  {
                    fontSize: fontSize.program,
                    marginTop: cardDimensions.height * 0.02,
                  },
                ]}
              >
                {user.program}
              </Text>
            </View>
          </View>

          {/* Cara trasera */}
          <View
            style={[
              styles.card,
              { width: cardDimensions.width, height: cardDimensions.height },
            ]}
          >
            <View
              style={[
                styles.backInfo,
                { paddingVertical: cardDimensions.height * 0.04 },
              ]}
            >
              <View style={styles.labelContainer}>
                <Text style={[styles.label, { fontSize: fontSize.label }]}>
                  Nombre completo
                </Text>
                <Text style={[styles.value, { fontSize: fontSize.value }]}>
                  {user.name} {user.paternal_lastname} {user.maternal_lastname}
                </Text>
              </View>

              <View style={styles.labelContainer}>
                <Text style={[styles.label, { fontSize: fontSize.label }]}>
                  Programa Académico
                </Text>
                <Text style={[styles.value, { fontSize: fontSize.value }]}>
                  {user.program}
                </Text>
              </View>

              <View style={styles.labelContainer}>
                <Text style={[styles.label, { fontSize: fontSize.label }]}>
                  Correo electrónico institucional
                </Text>
                <Text style={[styles.value, { fontSize: fontSize.value }]}>
                  {user.institutionalEmail}
                </Text>
              </View>

              <View style={styles.labelContainer}>
                <Text style={[styles.label, { fontSize: fontSize.label }]}>
                  Correo electrónico personal
                </Text>
                <Text style={[styles.value, { fontSize: fontSize.value }]}>
                  {user.personalEmail}
                </Text>
              </View>

              <View style={styles.labelContainer}>
                <Text style={[styles.label, { fontSize: fontSize.label }]}>
                  CURP
                </Text>
                <Text style={[styles.value, { fontSize: fontSize.value }]}>
                  {user.curp}
                </Text>
              </View>
            </View>
          </View>
        </FlipCard>
      </View>

      <View style={styles.navigationDots}>
        <View style={isFlipped ? styles.inactiveCircle : styles.circle} />
        <View style={isFlipped ? styles.circle : styles.inactiveCircle} />
      </View>
    </SafeAreaView>
  )
}
