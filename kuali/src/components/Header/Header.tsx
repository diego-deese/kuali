import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import styles from './Header.styles'
import colors from '../../constants/colors'
import LogoHorizontal from '../Logos/LogoHorizontal'
import { NotificationNoneIcon, LogoutIcon } from '../Icons/Icons'
import { usePathname } from 'expo-router'

interface HeaderProps {
  onTabPress: (tabName: string) => void // Función que se ejecutará cuando se presione un tab
}

const Header: React.FC<HeaderProps> = ({ onTabPress }) => {
  const pathname = usePathname()
  const isProfileScreen = pathname.includes('profile')

  const handleIconPress = () => {
    if (isProfileScreen) {
      onTabPress('logout') // Ejecuta logout solo si es el LogoutIcon
    } else {
      console.log('notificacion') // Muestra console.log si es el NotificationIcon
    }
  }

  return (
    <View style={styles.container}>
      <LogoHorizontal />
      <TouchableOpacity style={styles.tabButton} onPress={handleIconPress}>
        {isProfileScreen ? (
          <LogoutIcon color={colors.warningRed} size={32} />
        ) : (
          <NotificationNoneIcon color={colors.selectionBlue} size={32} />
        )}
      </TouchableOpacity>
    </View>
  )
}

export default Header
