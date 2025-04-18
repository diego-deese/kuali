import React from 'react'
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import styles from './CardCarousel.styles'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'

interface Props {
  image: any
  title: string
  date: string
  id: number
  location: string
  onNext?: () => void
  onPrev?: () => void
  isFirst?: boolean
  isLast?: boolean
}

export default function CardCarousel({
  image,
  title,
  date,
  id,
  location,
  onNext,
  onPrev,
  isFirst = false,
  isLast = false,
}: Props) {
  const handlePress = () => {
    router.push({
      pathname: `/event/${id}`,
      params: { title, date },
    })
  }
  return (
    <Pressable onPress={handlePress}>
      <View style={styles.card}>
        {/* Contenedor para imagen y la capa oscura */}
        <View style={styles.image}>
          <Image source={image} style={styles.image} resizeMode='cover' />
          <View style={styles.darkOverlay} />
        </View>

        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.row}>
            <FontAwesome
              name='calendar'
              size={14}
              color='#fff'
              style={styles.icon}
            />
            <Text style={styles.text}>{date}</Text>
          </View>
          <View style={styles.row}>
            <FontAwesome
              name='map-marker'
              size={14}
              color='#fff'
              style={styles.icon}
            />
            <Text style={styles.text}>{location}</Text>
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity onPress={onPrev} disabled={isFirst}>
            <FontAwesome name='chevron-left' size={30} color='#fff' />
          </TouchableOpacity>

          <TouchableOpacity onPress={onNext} disabled={isLast}>
            <FontAwesome name='chevron-right' size={30} color='#fff' />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  )
}
