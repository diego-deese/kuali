import React from 'react'
import {
  PressableProps,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
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
  errorLabel?: string
  error?: boolean
  showLabel?: boolean
  label?: string
}

const Button: React.FC<CustomPressableProps> = ({
  onPress,
  buttonText,
  size = 'normal',
  disabled = false,
  variant = 'primary',
  icon,
  style,
  errorLabel = '',
  error = false,
  label = '',
  showLabel = false,
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
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          getButtonColor(),
          size === 'small' && styles.buttonSmall,
          style,
        ]}
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
      {error && <Text style={styles.errorLabel}>{errorLabel}</Text>}
      {showLabel && <Text style={styles.label}>{label}</Text>}
    </View>
  )
}

export default Button
