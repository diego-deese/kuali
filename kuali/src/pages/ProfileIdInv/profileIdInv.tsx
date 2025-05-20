import React, { useState } from 'react'
import colors from '../../constants/colors'
import {
  SafeAreaView,
  View,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native'
import styles from './profileIdInv.styles'
import { LinearGradient } from 'expo-linear-gradient'
import FlipCard from 'react-native-flip-card'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { calculateDimensions } from '../ProfileId/profileIdutils'
import { useUserProfile } from '../../hooks/useUserProfile'
import BlackBox from '../../components/ProfileId/ReverseBox'
import { ReverseIcon } from '../../components/shared/Icons/Icons'

export default function ProfileId() {
  const [isFlipped, setIsFlipped] = useState(false)

  const [onUpdateImage, setOnUpdateImage] = useState(Math.random())

  const insets = useSafeAreaInsets()
  const { cardDimensions, imageSize, fontSize } = calculateDimensions(insets)

  const {
    userProfile,
    imgUrl,
    loading,
    imageLoading,
    setImageLoading,
    getProgramName,
  } = useUserProfile()

  // if (loading) {
  //   return (
  //     <SafeAreaView style={[styles.container, styles.loadingContainer]}>
  //       <ActivityIndicator size='large' color={colors.selectionBlue} />
  //       <Text style={styles.loadingText}>Cargando información...</Text>
  //     </SafeAreaView>
  //   )
  // }

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
          friction={20}
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
                source={{
                  uri: imgUrl + '?' + onUpdateImage,
                  cache: 'reload',
                }}
                style={[
                  styles.image,
                  { display: imageLoading ? 'none' : 'flex' },
                ]}
                onLoadStart={() => {
                  // setImageLoading(true)
                }}
                onLoad={() => {
                  setImageLoading(false)
                }}
                onLoadEnd={() => {
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
              <Text
                style={[
                  styles.program,
                  {
                    fontSize: fontSize.program,
                    marginTop: cardDimensions.height * 0.02,
                  },
                ]}
              >
                {'SNI Distincion'}
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
                {'hugo@dominio.com'}
              </Text>
            </View>
            <BlackBox cardDimensions={cardDimensions}>
              <ReverseIcon />
            </BlackBox>
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
                  No. nombramiento
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
                  Categoria
                </Text>
                <Text style={[styles.value, { fontSize: fontSize.value }]}>
                  {getProgramName()}
                </Text>
              </View>

              <View style={styles.labelContainer}>
                <Text style={[styles.label, { fontSize: fontSize.label }]}>
                  Linea de investigación
                </Text>
                <Text style={[styles.value, { fontSize: fontSize.value }]}>
                  {userProfile?.institutional_email}
                </Text>
              </View>

              <View style={styles.labelContainer}>
                <Text style={[styles.label, { fontSize: fontSize.label }]}>
                  No. de seguro social
                </Text>
                <Text style={[styles.value, { fontSize: fontSize.value }]}>
                  {userProfile?.personal_email || 'No proporcionado'}
                </Text>
              </View>

              <View style={styles.labelContainer}>
                <Text style={[styles.label, { fontSize: fontSize.label }]}>
                  Vigencia
                </Text>
                <Text style={[styles.value, { fontSize: fontSize.value }]}>
                  {userProfile?.curp || 'No disponible'}
                </Text>
              </View>
            </View>
            <BlackBox cardDimensions={cardDimensions}>
              <ReverseIcon />
            </BlackBox>
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
