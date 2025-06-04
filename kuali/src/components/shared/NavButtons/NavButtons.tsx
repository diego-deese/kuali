import React from 'react'
import { View, Text, Pressable } from 'react-native'
import styles from './styles'

type Props = {
  currentIndex: number
  total: number
  onPrev: () => void
  onNext: () => void
  label?: string
}

export default function NavButtons({
  currentIndex,
  total,
  onPrev,
  onNext,
  label = 'Documento',
}: Props) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPrev} disabled={currentIndex === 0 || total === 0}>
        <Text
          style={[
            styles.navText,
            (currentIndex === 0 || total === 0) && styles.disabled,
          ]}
        >
          {'← Anterior'}
        </Text>
      </Pressable>
      <Text style={styles.pageText}>
        {total === 0
          ? `${label} 0 de 0`
          : `${label} ${currentIndex + 1} de ${total}`}
      </Text>
      <Pressable
        onPress={onNext}
        disabled={currentIndex === total - 1 || total === 0}
      >
        <Text
          style={[
            styles.navText,
            (currentIndex === total - 1 || total === 0) && styles.disabled,
          ]}
        >
          {'Siguiente →'}
        </Text>
      </Pressable>
    </View>
  )
}
