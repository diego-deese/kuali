import { Stack } from 'expo-router'
import { View } from 'react-native'
import Header from '../../components/Header/Header'
import TabBar from '../../components/TabBar/TabBar'
import { useAuth } from '../../context/AuthContext'

export default function EventLayout() {
  const { onLogout } = useAuth()

  return (
    <View style={{ flex: 1 }}>
      <Header onTabPress={onLogout} />

      {/* Stack para las rutas dentro de event/ */}
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />

      {/* TabBar similar al de la navegación por pestañas */}
      <TabBar
        state={{
          routes: [
            { name: 'myactivities', key: 'myactivities' },
            { name: 'calendar', key: 'calendar' },
            { name: 'myprofile', key: 'myprofile' },
          ],
          index: -1, //Para que no se resalte nada en la tabnav
          history: [],
        }}
        descriptors={{
          myactivities: { options: {} },
          calendar: { options: {} },
          myprofile: { options: {} },
        }}
        navigation={{
          navigate: (name) => {
            const { router } = require('expo-router')
            router.replace(`/(tabs)/${name}`)
          },
          emit: () => ({ defaultPrevented: false }),
        }}
      />
    </View>
  )
}
