import React from 'react'
import { Pressable, PressableProps, ActivityIndicator } from 'react-native'

interface IconButtonProps extends PressableProps {
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
    <Pressable onPress={onPress} {...restProps}>
      {isLoading ? <ActivityIndicator size='small' color='black' /> : icon}
    </Pressable>
  )
}

export default IconButton
