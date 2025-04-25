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
import userService from '../../services/user.service'
import Toast from 'react-native-toast-message'

export default function ProfileId() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [imgUrl, setImgUrl] = useState('../../../assets/cicataLogo.png')
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const { user } = useAuth()
  const insets = useSafeAreaInsets()
  const { cardDimensions, imageSize, fontSize } = calculateDimensions(insets)

  useEffect(() => {
    const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/users/${user.user_id}/profilePhoto`

    console.log('Cambiando url de imagen: ', apiUrl)

    setImgUrl(apiUrl)
    //}, [user])
    const fetchUserProfile = async () => {
      if (!user || !user.user_id) {
        console.log('No hay ID de usuario disponible', user)
        setLoading(false)
        return
      }

      console.log(
        'Intentando cargar el perfil del usuario con ID:',
        user.user_id,
      )

      try {
        const result = await userService.getUserProfile(user.user_id)
        console.log('Respuesta de getUserProfile:', result)

        if ('success' in result && !result.success) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2:
              result.message || 'No se pudo cargar la información del perfil',
          })
        } else {
          setUserProfile(result)
          console.log('Perfil de usuario establecido:', result)
        }
      } catch (error) {
        console.error('Error al cargar el perfil:', error)
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'No se pudo cargar la información del perfil',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
    if (user?.user_id) {
      setImgUrl(userService.getProfilePhotoUrl(user.user_id))
    }
  }, [user, user?.user_id])

  // if (loading) {
  //   return (
  //     <SafeAreaView style={[styles.container, styles.loadingContainer]}>
  //       <ActivityIndicator size='large' color={colors.selectionBlue} />
  //       <Text style={styles.loadingText}>Cargando información...</Text>
  //     </SafeAreaView>
  //   )
  // }

  const getProgramName = () => {
    // Verificar si hay programas como estudiante
    if (userProfile?.academic_programs_as_student?.length > 0) {
      const studentProgram = userProfile.academic_programs_as_student[0].program
      if (studentProgram && studentProgram.name) {
        return studentProgram.name
      }
    }

    // Verificar si hay programas como investigador
    if (userProfile?.academic_programs_as_researcher?.length > 0) {
      const researcherProgram = userProfile.academic_programs_as_researcher[0]
      if (researcherProgram && researcherProgram.name) {
        return researcherProgram.name
      }
    }

    return 'Sin programa asignado'
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
              {imageLoading && (
                <ActivityIndicator size='large' color={colors.selectionBlue} />
              )}
              <Image
                source={{ uri: imgUrl }}
                style={[
                  styles.image,
                  { display: imageLoading ? 'none' : 'flex' },
                ]}
                onLoadStart={() => {
                  console.log('Cargando imagen: ', imgUrl)
                  // setImageLoading(true)
                }}
                onLoad={() => {
                  setImageLoading(false)
                }}
                onLoadEnd={() => {
                  console.log('Imagen cargada!!!')
                  setImageLoading(false)
                }}
                onError={(e) => {
                  console.error('Error cargando imagen:', e.nativeEvent.error)
                  setImageLoading(false)
                }}
              />
            </View>
            <View
              style={[styles.info, { marginTop: cardDimensions.height * 0.38 }]}
            >
              <Text style={[styles.names, { fontSize: fontSize.name }]}>
                {userProfile?.name} {userProfile?.paternal_lastname}
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
                {userProfile?.identifier}
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
                {userProfile?.role?.name || 'Usuario'}
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
                {getProgramName()}
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
                  {userProfile?.name}{' '}
                  {userProfile?.second_name
                    ? `${userProfile.second_name} `
                    : ''}
                  {userProfile?.paternal_lastname}{' '}
                  {userProfile?.maternal_lastname}
                </Text>
              </View>

              <View style={styles.labelContainer}>
                <Text style={[styles.label, { fontSize: fontSize.label }]}>
                  Programa Académico
                </Text>
                <Text style={[styles.value, { fontSize: fontSize.value }]}>
                  {getProgramName()}
                </Text>
              </View>

              <View style={styles.labelContainer}>
                <Text style={[styles.label, { fontSize: fontSize.label }]}>
                  Correo electrónico institucional
                </Text>
                <Text style={[styles.value, { fontSize: fontSize.value }]}>
                  {userProfile?.institutional_email}
                </Text>
              </View>

              <View style={styles.labelContainer}>
                <Text style={[styles.label, { fontSize: fontSize.label }]}>
                  Correo electrónico personal
                </Text>
                <Text style={[styles.value, { fontSize: fontSize.value }]}>
                  {userProfile?.personal_email || 'No proporcionado'}
                </Text>
              </View>

              <View style={styles.labelContainer}>
                <Text style={[styles.label, { fontSize: fontSize.label }]}>
                  CURP
                </Text>
                <Text style={[styles.value, { fontSize: fontSize.value }]}>
                  {userProfile?.curp || 'No disponible'}
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
