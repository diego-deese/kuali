import React from 'react'
import { Pressable, PressableProps, Text } from 'react-native'
import styles from './styles'

interface CustomPressableProps extends PressableProps {
  isLoading?: boolean
  buttonText?: string
  size?: 'normal' | 'small'
  disabled?: boolean
}

const Button: React.FC<CustomPressableProps> = ({
  isLoading = false,
  onPress,
  buttonText,
  size = 'normal',
  disabled = false,
  ...restProps
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        isLoading ? styles.buttonDisabled : styles.button,
        size === 'small' && styles.buttonSmall,
        pressed && { opacity: 0.7 },
      ]}
      onPress={onPress}
      disabled={isLoading}
      {...restProps}
    >
      <Text
        style={[styles.buttonText, size === 'small' && styles.buttonTextSmall]}
      >
        {isLoading ? 'Cargando...' : buttonText}
      </Text>
    </Pressable>
  )
}

export default Button
