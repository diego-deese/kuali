import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import styles from './Header.styles'
import colors from '../../constants/colors'
import LogoHorizontal from '../Logos/LogoHorizontal'
import { NotificationNoneIcon } from '../Icons/Icons'

interface HeaderProps {
  onTabPress: (tabName: string) => void // Función que se ejecutará cuando se presione un tab
}

const Header: React.FC<HeaderProps> = ({ onTabPress }) => {
  const handleTabPress = (tabName: string) => {
    onTabPress(tabName) // Llamamos a la función que pasamos por props
  }

  return (
    <View style={styles.container}>
      <LogoHorizontal />
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleTabPress('notificacion')}
      >
        <NotificationNoneIcon color={colors.selectionBlue} size={32} />
      </TouchableOpacity>
    </View>
  )
}

export default Header
