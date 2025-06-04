import { Image, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface PosterModalProps {
  visible?: boolean
  posterUri?: string
}

const PosterModal: React.FC<PosterModalProps> = ({
  visible = false,
  posterUri = '',
}) => {
  console.log(posterUri)

  return (
    <Modal visible={visible}>
      <Image src={posterUri}></Image>
      <Text>Hola</Text>
    </Modal>
  )
}

export default PosterModal

const styles = StyleSheet.create({})
