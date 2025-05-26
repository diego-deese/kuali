import { Redirect, Tabs, usePathname } from 'expo-router'
import TabBar from '../../components/shared/TabBar/TabBar'
import { useAuth } from '../../context/AuthContext'
import LoadingScreen from '../../pages/LoadingScreen/LoadingScreen'
import { Roles } from '../../constants/roles'
import Header from '../../components/shared/Header/Header'
import IconButton from '../../components/shared/IconButton/IconButton'
import { LogoutIcon } from '../../components/shared/Icons/Icons'
import colors from '../../constants/colors'

export default function TabsLayout() {
  const { authenticated, loading, onLogout, user } = useAuth()

  const pathname = usePathname()
  const showLogoutButton =
    pathname.includes('profile') || user.role.role_id === Roles.ADMIN

  if (loading) {
    return <LoadingScreen />
  }

  if (!authenticated) {
    return <Redirect href='/' />
  }

  return (
    <Tabs
      screenOptions={{
        header: () => (
          <Header
            rightComponent={
              showLogoutButton && (
                <IconButton
                  icon={<LogoutIcon size={32} color={colors.warningRed} />}
                  onPress={onLogout}
                />
              )
            }
          />
        ),
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name='myactivities' />
      <Tabs.Screen name='calendar' />
      <Tabs.Screen
        name='mystudents'
        redirect={user.role.role_id !== Roles.TEACHER}
      />
      <Tabs.Screen name='myprofile' />
    </Tabs>
  )
}
