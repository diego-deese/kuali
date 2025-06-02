import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import {
  CalendarClockIcon,
  CalendarIcon,
  CalendarPlusIcon,
  UploadIcon,
} from '../Icons/Icons'
import colors from '../../../constants/colors'
import Button from '../Button/Button'
import { router } from 'expo-router'

interface EmptyActivityCardProps {
  mode?: 'upcoming' | 'past'
}

const EmptyActivityCard: React.FC<EmptyActivityCardProps> = ({
  mode = 'upcoming',
}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    rotateAnim.setValue(0)

    const animation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      }),
    )

    animation.start()

    return () => {
      animation.stop()
    }
  }, [rotateAnim])

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Animated.View
          style={[styles.dashedBorder, { transform: [{ rotate: spin }] }]}
        />
        <View style={styles.iconContainer}>
          <CalendarIcon color={colors.inactiveGray} size={64} />
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.header}>
          {mode === 'upcoming'
            ? 'No hay eventos próximos'
            : 'No hay eventos pasados'}
        </Text>
        <Text style={styles.text}>
          {mode === 'upcoming'
            ? 'Aún no te has inscrito a ningún evento o convocatoria'
            : 'Tu historial de eventos está vacío'}
        </Text>
        <Text style={styles.text}>
          {mode === 'upcoming'
            ? '¡Inscribete a un evento para comenzar!'
            : '¡Aquí encontrarás los eventos a los que te inscribiste en el pasado!'}
        </Text>
      </View>

      <Button
        style={{ marginBottom: 24 }}
        buttonText='Ver los eventos próximos'
        icon={<CalendarClockIcon color={colors.solidWhite} size={28} />}
        onPress={() => {
          router.navigate('/calendar')
        }}
      />

      <View style={styles.tipsContainer}>
        <CalendarPlusIcon color={colors.placeholderGray} />
        <Text style={styles.tipText}>Añade los eventos de tu interés</Text>
      </View>

      <View style={styles.tipsContainer}>
        <UploadIcon color={colors.placeholderGray} />
        <Text style={styles.tipText}>Sube los documentos necesarios</Text>
      </View>
    </View>
  )
}

export default EmptyActivityCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 16,
    padding: 32,
  },
  iconWrapper: {
    width: 120,
    height: 120,
    marginBottom: 24,
    position: 'relative',
  },
  dashedBorder: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 60,
    borderWidth: 4,
    borderColor: colors.borderGray,
    borderStyle: 'dashed',
  },
  iconContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginBottom: 24,
  },
  tipsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  header: {
    fontFamily: 'monserratBold',
    includeFontPadding: false,
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  tipText: {
    color: colors.inactiveGray,
    fontFamily: 'monserratItalic',
    includeFontPadding: false,
    fontSize: 16,
  },
})
