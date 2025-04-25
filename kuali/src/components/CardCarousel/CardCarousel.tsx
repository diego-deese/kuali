import React from 'react'
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import styles from './CardCarousel.styles'
import { router } from 'expo-router'
import colors from '../../constants/colors'
import {
  CalendarEvent,
  LeftArrow,
  LocationIcon,
  RightArrow,
} from '../Icons/Icons'

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
      params: { title, date, location },
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
            <CalendarEvent
              size={14}
              color={colors.solidWhite}
              style={styles.icon}
            />
            <Text style={styles.text}>{date}</Text>
          </View>
          <View style={styles.row}>
            <LocationIcon
              size={14}
              color={colors.solidWhite}
              style={styles.icon}
            />
            <Text style={styles.text}>{location}</Text>
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity onPress={(e) => {
            e.stopPropagation();
            if ( !isFirst) onPrev();
          }}>
            <LeftArrow size={30} color={colors.solidWhite} />
          </TouchableOpacity>

          <TouchableOpacity onPress={(e) => {
            e.stopPropagation();
            if ( !isLast) onNext();
          }}>
            <RightArrow size={30} color={colors.solidWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  )
}
