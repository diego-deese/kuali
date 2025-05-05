import { ActivityIndicator, Modal, View } from 'react-native'
import React from 'react'
import colors from '../../../constants/colors'
import { styles } from './styles'

interface LoadingModalProps {
  visible: boolean
}

const LoadingModal: React.FC<LoadingModalProps> = ({ visible = false }) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.background}>
        <View style={styles.container}>
          <ActivityIndicator size='large' color={colors.selectionBlue} />
        </View>
      </View>
    </Modal>
  )
}

export default LoadingModal
