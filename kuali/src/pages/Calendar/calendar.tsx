import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/AuthContext'

export default function MyEvents() {
  const { user } = useAuth()

  console.log(user)

  return (
    <View>
      <Text>MyEvents</Text>
      <Text>{JSON.stringify(user)}</Text>
    </View>
  )
}
