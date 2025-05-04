import React from 'react'
import { Pressable, PressableProps, Text } from 'react-native'
import styles from './styles'

interface CustomPressableProps extends PressableProps {
  isLoading?: boolean
  buttonText?: string
}

const Button: React.FC<CustomPressableProps> = ({
  isLoading = false,
  onPress,
  buttonText,
  ...restProps
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        isLoading ? styles.buttonDisabled : styles.button,
        pressed && { opacity: 0.7 },
      ]}
      onPress={onPress}
      disabled={isLoading}
      {...restProps}
    >
      <Text style={styles.buttonText}>
        {isLoading ? 'Cargando...' : buttonText}
      </Text>
    </Pressable>
  )
}

export default Button
