import { Tabs } from 'expo-router'
import {
  BookmarkBorderIcon,
  CalendarBorderIcon,
  ProfileBorderIcon,
} from '../../components/Icons/Icons'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Mis actividades',
          tabBarIcon: () => <BookmarkBorderIcon />,
        }}
      />
      <Tabs.Screen
        name='calendar'
        options={{
          title: 'Calendario',
          tabBarIcon: () => <CalendarBorderIcon />,
        }}
      />
      <Tabs.Screen
        name='myprofile'
        options={{
          title: 'Mi Perfil',
          tabBarIcon: () => <ProfileBorderIcon />,
        }}
      />
    </Tabs>
  )
}
