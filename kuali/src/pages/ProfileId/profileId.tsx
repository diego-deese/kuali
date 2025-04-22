import React, { useEffect, useState } from 'react'
import colors from '../../constants/colors'
import {
  SafeAreaView,
  View,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native'
import styles from './profileId.styles'
import { LinearGradient } from 'expo-linear-gradient'
import FlipCard from 'react-native-flip-card'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { calculateDimensions } from './profileIdutils'
import { useAuth } from '../../context/AuthContext'

const dummy_user = {
  name: 'Juan Pablo',
  paternal_lastname: 'Escobar',
  maternal_lastname: 'Juarez',
  curp: 'BURD040804MMSCVLA1',
  identifier: 'A01424009',
  role: 'Student',
  institutionalEmail: 'a01425452@tec.mx',
  personalEmail: 'mucast8@gmail.com',
  program: 'ITC',
  photo: require('../../../assets/cicataLogo.png'),
}

export default function ProfileId() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [imgUrl, setImgUrl] = useState('')
  //const [userData, setUserData] = useState(dummy_user) //PARA INFO USER
  //const [loading, setLoading] = useState(true)  //PARA INFO USER

  const { user } = useAuth()

  const insets = useSafeAreaInsets()

  // Calcular las dimensiones una vez al cargar el componente
  const { cardDimensions, imageSize, fontSize } = calculateDimensions(insets)

  useEffect(() => {
    const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/users/${user.user_id}/profilePhoto`

    setImgUrl(apiUrl)
  }, [user.user_id])

  //PARA LA INFO DEL USUARIO
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       setLoading(true)
  //       const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/users/${user.user_id}`
  //       const response = await fetch(apiUrl)

  //       if (!response.ok) {
  //         throw new Error('Error al obtener datos del usuario')
  //       }

  //       const data = await response.json()
  //       setUserData(data)
  //     } catch (error) {
  //       console.error('Error obteniendo información del usuario:', error)
  //       // Mantener los datos dummy en caso de error
  //     }
  //   }

  //   fetchUserData()
  // }, [user.user_id])

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
          onFlipEnd={() => {
            setIsFlipped((prevState) => !prevState)
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
              {imageLoading ? (
                <ActivityIndicator size='large' color={colors.selectionBlue} />
              ) : (
                <Image
                  source={{ uri: imgUrl }}
                  style={styles.image}
                  onLoadStart={() => setImageLoading(true)}
                  onLoadEnd={() => setImageLoading(false)}
                  onError={(e) => {
                    console.error('Error cargando imagen:', e.nativeEvent.error)
                    setImageLoading(false)
                  }}
                />
              )}
            </View>
            <View
              style={[styles.info, { marginTop: cardDimensions.height * 0.38 }]}
            >
              <Text style={[styles.names, { fontSize: fontSize.name }]}>
                {dummy_user.name} {dummy_user.paternal_lastname}
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
                {dummy_user.identifier}
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
                {dummy_user.role}
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
                {dummy_user.program}
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
                  {dummy_user.name} {dummy_user.paternal_lastname}{' '}
                  {dummy_user.maternal_lastname}
                </Text>
              </View>

              <View style={styles.labelContainer}>
                <Text style={[styles.label, { fontSize: fontSize.label }]}>
                  Programa Académico
                </Text>
                <Text style={[styles.value, { fontSize: fontSize.value }]}>
                  {dummy_user.program}
                </Text>
              </View>

              <View style={styles.labelContainer}>
                <Text style={[styles.label, { fontSize: fontSize.label }]}>
                  Correo electrónico institucional
                </Text>
                <Text style={[styles.value, { fontSize: fontSize.value }]}>
                  {dummy_user.institutionalEmail}
                </Text>
              </View>

              <View style={styles.labelContainer}>
                <Text style={[styles.label, { fontSize: fontSize.label }]}>
                  Correo electrónico personal
                </Text>
                <Text style={[styles.value, { fontSize: fontSize.value }]}>
                  {dummy_user.personalEmail}
                </Text>
              </View>

              <View style={styles.labelContainer}>
                <Text style={[styles.label, { fontSize: fontSize.label }]}>
                  CURP
                </Text>
                <Text style={[styles.value, { fontSize: fontSize.value }]}>
                  {dummy_user.curp}
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
