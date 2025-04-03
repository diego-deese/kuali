import React from "react"
import colors from "../../constants/colors"
import { SafeAreaView, View, Image, Text } from "react-native"
import styles from "./profileId.styles"
import { LinearGradient } from "expo-linear-gradient"
import FlipCard from "react-native-flip-card"
import styles2 from "../ProfileInfo/profileInfo.styles"

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
  return (
    <SafeAreaView style={styles.container}>
      <FlipCard>
        //Vista frontal
        <View /*style={styles.face}*/>
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
        </View>
        <View /*style={styles.back}*/>
          <View style={styles.card}>
            <View style={styles.info}>
              <View style={styles2.labelContainer}>
                <Text style={styles2.label}>Nombre completo</Text>
                <Text style={styles2.value}>
                  {user.name} {user.paternal_lastname}
                </Text>
              </View>

              <View style={styles2.labelContainer}>
                <Text style={styles2.label}>Programa Académico</Text>
                <Text style={styles2.value}>{user.program}</Text>
              </View>

              <View style={styles2.labelContainer}>
                <Text style={styles2.label}>
                  Correo electrónico institucional
                </Text>
                <Text style={styles2.value}>{user.institutionalEmail}</Text>
              </View>

              <View style={styles2.labelContainer}>
                <Text style={styles2.label}>Correo electrónico personal</Text>
                <Text style={styles2.value}>{user.personalEmail}</Text>
              </View>

              <View style={styles2.labelContainer}>
                <Text style={styles2.label}>CURP</Text>
                <Text style={styles2.value}>{user.curp}</Text>
              </View>
            </View>
          </View>
        </View>
      </FlipCard>
      <View style={styles.navigationDots}>
        <View style={styles.circle} />
        <View style={styles.inactiveCircle} />
      </View>
    </SafeAreaView>
  )
}
