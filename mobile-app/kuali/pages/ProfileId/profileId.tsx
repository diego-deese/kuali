import React from "react"
import colors from "../../constants/colors"
import { SafeAreaView, View, Image, Text } from "react-native"
import styles from "./profileId.styles"
import { LinearGradient } from "expo-linear-gradient"

const user = {
  name: "Juan Pablo",
  paternal_lastname: "Escobar",
  identifier: "A01424009",
  role: "Student",
  program: "ITC",
  photo: require("../../assets/cicataLogo.png"),
}
export default function ProfileId() {
  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  )
}
