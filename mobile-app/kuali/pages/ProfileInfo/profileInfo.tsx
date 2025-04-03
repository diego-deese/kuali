import React from "react"
//import colors from "../../constants/colors"
import { SafeAreaView, View, Image, Text } from "react-native"
import styles from "./profileInfo.styles"
import { LinearGradient } from "expo-linear-gradient"

const colors = {
  highlightCyan: '#00e0ff',
  selectionBlue: '#0059ff',
};

const user = {
  name: "Jorge Luis",
  paternal_lastname: "Alvarez Martínez",
  curp: "BURD040804MMSCVLA1",
  program: "Ingeniería en Mecatrónica",
  institutionalEmail: "a01425452@tec.mx",
  personalEmail: "mucast8@gmail.com",
  //photo: require('../../assets/cicataLogo.png'),
};

export default function ProfileInfo() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.info}>

          <View style={styles.labelContainer}>
            <Text style={styles.label}>Nombre completo</Text>
            <Text style={styles.value}>{user.name} {user.paternal_lastname}</Text>
         </View>

          <View style={styles.labelContainer}>
            <Text style={styles.label}>Programa Académico</Text>
            <Text style={styles.value}>{user.program}</Text>
          </View>

          <View style={styles.labelContainer}>
            <Text style={styles.label}>Correo electrónico institucional</Text>
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
    </SafeAreaView>
  );
};