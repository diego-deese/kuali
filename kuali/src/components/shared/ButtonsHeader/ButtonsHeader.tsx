import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'

interface ButtonsHeaderProps {
  title?: string
  children?: any
}

const ButtonsHeader: React.FC<ButtonsHeaderProps> = ({ children, title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconsContainer}>{children}</View>
    </View>
  )
}

export default ButtonsHeader
