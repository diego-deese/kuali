import React from 'react'
import { Pressable, PressableProps, Text } from 'react-native'
import styles from './styles'
import colors from '../../../constants/colors'

interface CustomPressableProps extends PressableProps {
  isLoading?: boolean
  buttonText?: string
  size?: 'normal' | 'small'
  disabled?: boolean
  variant?: 'primary' | 'delete'
}

const Button: React.FC<CustomPressableProps> = ({
  isLoading = false,
  onPress,
  buttonText,
  size = 'normal',
  disabled = false,
  variant = 'primary',
  ...restProps
}) => {
  const getButtonColor = () => {
    if (disabled || isLoading) return styles.buttonDisabled

    switch (variant) {
      case 'delete':
        return { ...styles.button, backgroundColor: colors.warningRed }
      case 'primary':
      default:
        return styles.button
    }
  }
  return (
    <Pressable
      style={({ pressed }) => [
        getButtonColor(),
        //isLoading ? styles.buttonDisabled : styles.button,
        size === 'small' && styles.buttonSmall,
        pressed && { opacity: 0.7 },
      ]}
      onPress={onPress}
      disabled={isLoading}
      {...restProps}
    >
      <Text
        style={[styles.buttonText, size === 'small' && styles.buttonTextSmall]}
        //numberOfLines={1}
      >
        {isLoading ? 'Cargando...' : buttonText}
      </Text>
    </Pressable>
  )
}

export default Button
