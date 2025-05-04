import React from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { TouchableProps } from 'react-native-svg'

interface IconButtonProps extends TouchableProps {
  isLoading?: boolean
  icon: React.ReactNode
}

const IconButton: React.FC<IconButtonProps> = ({
  isLoading = false,
  onPress,
  icon,
  ...restProps
}) => {
  return (
    <TouchableOpacity onPress={onPress} {...restProps}>
      {isLoading ? <ActivityIndicator size='small' color='black' /> : icon}
    </TouchableOpacity>
  )
}

export default IconButton
