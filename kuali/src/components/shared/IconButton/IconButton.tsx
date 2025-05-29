import React from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { TouchableProps } from 'react-native-svg'

interface IconButtonProps extends TouchableProps {
  isLoading?: boolean
  icon: React.ReactNode
  disabled?: boolean
}

const IconButton: React.FC<IconButtonProps> = ({
  isLoading = false,
  onPress,
  icon,
  disabled = false,
  ...restProps
}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} {...restProps}>
      {isLoading ? <ActivityIndicator size='small' color='black' /> : icon}
    </TouchableOpacity>
  )
}

export default IconButton
