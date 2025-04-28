import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { act, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import IconButton from '../../components/IconButton/IconButton'
import styles from './usersmanagement.styles'
import { PlusIcon } from '../../components/Icons/Icons'
import UserCard from '../../components/UserCard/UserCard'

export default function UsersManagement() {
  const [activeTab, setActiveTab] = useState('Estudiantes')

  const sampleUsers = [
    { username: 'Juanito Perez', id: 1, state: false },
    { username: 'Dultez de papel', id: 2, state: true },
    { username: 'Jorge Alvarez', id: 3, state: true },
  ]

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}> Gestión de usuarios </Text>
          <IconButton
            icon={<PlusIcon />}
            onPress={() => console.log('Añadir usuario')}
          />
        </View>
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab('Estudiantes')}>
            <Text
              style={
                activeTab === 'Estudiantes'
                  ? styles.activeTab
                  : styles.inactiveTab
              }
            >
              {' '}
              Estudiantes{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Investigadores')}>
            <Text
              style={
                activeTab === 'Investigadores'
                  ? styles.activeTab
                  : styles.inactiveTab
              }
            >
              {' '}
              Investigadores{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Administradores')}>
            <Text
              style={
                activeTab === 'Administradores'
                  ? styles.activeTab
                  : styles.inactiveTab
              }
            >
              {' '}
              Administradores{' '}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {activeTab === 'Estudiantes' && (
            <ScrollView>
              {sampleUsers.map((users, i) => (
                <UserCard
                  key={i}
                  username={users.username}
                  state={users.state}
                />
              ))}
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
