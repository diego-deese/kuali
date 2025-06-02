import React, { useState } from 'react'
import {
  SafeAreaView,
  View,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import FlipCard from 'react-native-flip-card'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useUserProfile } from '../../hooks/useUserProfile'
import { calculateDimensions } from './profileIdutils'
import BlackBox from '../../components/ProfileId/ReverseBox'
import { ReverseIcon } from '../../components/shared/Icons/Icons'
import styles from './profileId.styles'
import colors from '../../constants/colors'

export default function ProfileIdCard({
  extraFields = [],
  frontFields = [],
}: {
  extraFields: { label: string; value: string | undefined }[]
  frontFields: { label: string; value: string | undefined }[]
}) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [onUpdateImage, setOnUpdateImage] = useState(Math.random())
  const insets = useSafeAreaInsets()
  const { cardDimensions, imageSize, fontSize } = calculateDimensions(insets)

  const { userProfile, imgUrl, imageLoading, setImageLoading } =
    useUserProfile()

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
          friction={200}
          onFlipStart={() => {
            setIsFlipped((prevState) => !prevState)
          }}
        >
          {/* Front */}
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
                source={{ uri: imgUrl + '?' + onUpdateImage, cache: 'reload' }}
                style={[
                  styles.image,
                  { display: imageLoading ? 'none' : 'flex' },
                ]}
                onLoad={() => setImageLoading(false)}
                onLoadEnd={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
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
              {frontFields.map((field, i) => (
                <Text
                  key={i}
                  style={[
                    styles.program,
                    {
                      fontSize: fontSize.program,
                      marginTop: cardDimensions.height * 0.02,
                    },
                  ]}
                >
                  {field.value || 'No disponible'}
                </Text>
              ))}
            </View>
            <BlackBox cardDimensions={cardDimensions}>
              <ReverseIcon />
            </BlackBox>
          </View>

          {/* Back */}
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
              {extraFields.map((field, i) => (
                <View key={i} style={styles.labelContainer}>
                  <Text style={[styles.label, { fontSize: fontSize.label }]}>
                    {field.label}
                  </Text>
                  <Text style={[styles.value, { fontSize: fontSize.value }]}>
                    {field.value || 'No disponible'}
                  </Text>
                </View>
              ))}
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
