import React, { useState } from "react"
import colors from "../../constants/colors"
import { SafeAreaView, View, Image, Text } from "react-native"
import styles from "./profileId.styles"
import { LinearGradient } from "expo-linear-gradient"
import FlipCard from "react-native-flip-card"

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flipCardContainer}>
        <FlipCard
          friction={6}
          onFlipEnd={(isFlippedStatus) => {
            if (isFlipped !== isFlippedStatus) {
              setIsFlipped(isFlippedStatus)
            }
          }}
        >
          {/* Cara frontal */}
          <View style={styles.card}>
            <LinearGradient
              colors={[colors.highlightCyan, colors.selectionBlue]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            />
            <View style={styles.imageContainer}>
              <Image source={user.photo} style={styles.image} />
            </View>
            <View style={styles.info}>
              <Text style={styles.names}>
                {user.name} {user.paternal_lastname}
              </Text>
              <Text style={styles.identifier}>{user.identifier}</Text>
              <Text style={styles.role}>{user.role}</Text>
              <Text style={styles.program}>{user.program}</Text>
            </View>
          </View>

          {/* Cara trasera */}
          <View style={styles.card}>
            <View style={styles.backInfo}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Nombre completo</Text>
                <Text style={styles.value}>
                  {user.name} {user.paternal_lastname} {user.maternal_lastname}
                </Text>
              </View>

              <View style={styles.labelContainer}>
                <Text style={styles.label}>Programa Académico</Text>
                <Text style={styles.value}>{user.program}</Text>
              </View>

              <View style={styles.labelContainer}>
                <Text style={styles.label}>
                  Correo electrónico institucional
                </Text>
                <Text style={styles.value}>{user.institutionalEmail}</Text>
              </View>

              <View style={styles.labelContainer}>
                <Text style={styles.label}>Correo electrónico personal</Text>
                <Text style={styles.value}>{user.personalEmail}</Text>
              </View>

              <View style={styles.labelContainer}>
                <Text style={styles.label}>CURP</Text>
                <Text style={styles.value}>{user.curp}</Text>
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
