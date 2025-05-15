import React from 'react'
import {
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import styles from './styles'
import colors from '../../../constants/colors'

interface CustomPressableProps extends PressableProps {
  buttonText?: string
  size?: 'normal' | 'small'
  disabled?: boolean
  variant?: 'primary' | 'delete' | 'cancel'
  icon?: React.ReactNode
  style?: StyleProp<ViewStyle>
}

const Button: React.FC<CustomPressableProps> = ({
  onPress,
  buttonText,
  size = 'normal',
  disabled = false,
  variant = 'primary',
  icon,
  style,
  ...restProps
}) => {
  const getButtonColor = () => {
    if (disabled) return styles.buttonDisabled

    switch (variant) {
      case 'delete':
        return { ...styles.button, backgroundColor: colors.warningRed }
      case 'cancel':
        return {
          ...styles.button,
          backgroundColor: colors.borderGray,
          borderColor: colors.inactiveGray,
          borderWidth: 1.5,
        }
      default:
        return styles.button
    }
  }

  return (
    <TouchableOpacity
      style={[getButtonColor(), size === 'small' && styles.buttonSmall, style]}
      onPress={onPress}
      disabled={disabled}
      {...restProps}
    >
      {icon && icon}
      <Text
        style={[
          styles.buttonText,
          size === 'small' && styles.buttonTextSmall,
          variant === 'cancel' && { color: colors.fontBlack },
        ]}
      >
        {buttonText}
      </Text>
    </TouchableOpacity>
  )
}

export default Button
