import { Redirect, Tabs } from 'expo-router'
import TabBar from '../../components/shared/TabBar/TabBar'
import { useAuth } from '../../context/AuthContext'
import LoadingScreen from '../../pages/LoadingScreen/LoadingScreen'
import { Roles } from '../../constants/roles'
import Header from '../../components/shared/Header/Header'

export default function TabsLayout() {
  const { authenticated, loading, onLogout, user } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  if (!authenticated) {
    return <Redirect href='/' />
  }

  return (
    <Tabs
      screenOptions={{
        header: () => <Header onTabPress={onLogout} />,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name='myactivities' />
      <Tabs.Screen name='calendar' />
      <Tabs.Screen name='myprofile' />
      <Tabs.Screen
        name='mystudents'
        redirect={user.role.role_id !== Roles.TEACHER}
      />
    </Tabs>
  )
}
