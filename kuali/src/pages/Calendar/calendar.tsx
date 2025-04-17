import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/AuthContext'

export default function MyEvents() {
  const { user } = useAuth()
  return (
    <View>
      <Text>{JSON.stringify(user)}</Text>
    </View>
  )
}
