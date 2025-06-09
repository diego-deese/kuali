import { Image, Modal, StyleSheet, View } from 'react-native'
import React from 'react'
import colors from '../../../constants/colors'
import Button from '../../shared/Button/Button'

interface PosterModalProps {
  visible?: boolean
  posterUri?: string
  onCloseModal: () => void
}

const PosterModal: React.FC<PosterModalProps> = ({
  visible = false,
  posterUri = '',
  onCloseModal,
}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.background}>
        <View style={styles.container}>
          <View style={styles.imgContainer}>
            <Image
              style={{ borderRadius: 10, width: '100%', aspectRatio: '9/16' }}
              source={{ uri: posterUri, cache: 'reload' }}
            />
          </View>
          <View>
            <Button buttonText='Aceptar' onPress={onCloseModal} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default PosterModal

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  container: {
    backgroundColor: colors.backgroundWhite,
    padding: 32,
    borderRadius: 16,
  },
  imgContainer: {
    maxWidth: 300,
    maxHeight: 533,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: colors.highlightCyan,
    borderRadius: 14,
  },
})
