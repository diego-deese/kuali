import { Redirect, Tabs } from 'expo-router'
import Header from '../../components/Header/Header'
import TabBar from '../../components/TabBar/TabBar'
import { useAuth } from '../../context/AuthContext'
import LoadingScreen from '../../pages/LoadingScreen/LoadingScreen'

export default function TabsLayout() {
  const { authenticated, loading, onLogout } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  if (!authenticated) {
    return <Redirect href='/login' />
  }

  return (
    <Tabs
      screenOptions={{
        header: () => <Header onTabPress={onLogout} />,
      }}
      tabBar={(props) => <TabBar {...props} />}
    />
  )
}
