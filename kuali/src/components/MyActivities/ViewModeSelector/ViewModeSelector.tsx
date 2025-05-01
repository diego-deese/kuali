import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'

interface Props {
  viewMode: 'list' | 'card' // Por ejemplo: ["opcion 1", "opcion 2"]
  onViewModeChange: (viewMode: 'list' | 'card') => void
}

export default function ViewModeSelector({
  viewMode,
  onViewModeChange,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.option, viewMode === 'list' && styles.active]}
        onPress={() => onViewModeChange('list')}
      >
        <Text style={[styles.text, viewMode === 'list' && styles.activeText]}>
          Lista
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.option, viewMode === 'card' && styles.active]}
        onPress={() => onViewModeChange('card')}
      >
        <Text style={[styles.text, viewMode === 'card' && styles.activeText]}>
          Tarjeta
        </Text>
      </TouchableOpacity>
    </View>
  )
}
