import React from 'react'
import { View } from 'react-native'
import styles from './Header.styles'
import colors from '../../../constants/colors'
import LogoHorizontal from '../Logos/LogoHorizontal'
import { NotificationNoneIcon } from '../Icons/Icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import IconButton from '../IconButton/IconButton'
import { useNotificationsContext } from '../../../context/NotificationsContext/NotificationsContext'

interface HeaderProps {
  leftComponent?: React.ReactNode
  rightComponent?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ leftComponent, rightComponent }) => {
  const insets = useSafeAreaInsets()

  const { notificationsDrawer } = useNotificationsContext()

  return (
    <View style={[styles.container, { paddingTop: insets.top * 0.7 }]}>
      {leftComponent || <LogoHorizontal />}
      {rightComponent || (
        <IconButton
          icon={<NotificationNoneIcon color={colors.selectionBlue} size={32} />}
          onPress={notificationsDrawer.toggleShowDrawer}
        />
      )}
    </View>
  )
}

export default Header
