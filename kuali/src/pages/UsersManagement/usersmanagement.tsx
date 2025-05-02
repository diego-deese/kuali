import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { act, useState, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import IconButton from '../../components/IconButton/IconButton'
import styles from './usersmanagement.styles'
import UserCard from '../../components/UserCard/UserCard'
import multipleUsersService from '../../services/multipleUsers.service'
import { User } from '../../types/User'
import authService from '../../services/auth.service'
import { PlusIcon } from '../../components/shared/Icons/Icons'
import { router } from 'expo-router'

export default function UsersManagement() {
  const [activeTab, setActiveTab] = useState('Estudiantes')
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const initialize = async () => {
      const token = await authService.getToken()
      if (token) {
        console.log('Token existe')
        fetchUsers()
      } else {
        console.warn('Token expirado o sin acceso')
      }
    }
    initialize()
  }, [])

  const fetchUsers = async () => {
    const response = await multipleUsersService.getUsers()
    if (response.success) {
      setUsers(response.users)
    } else {
      console.error('Failed to fetch users:', response.error)
    }
  }

  const students = users.filter((user) => user.role?.name === 'Estudiante')
  const researchers = users.filter((user) => user.role?.name === 'Investigador')
  const admins = users.filter((user) => user.role?.name === 'Administrador')

  const handleAddUser = () => {
    router.push({
      pathname: `/user/adduser`,
    })
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}> Gestión de usuarios </Text>
          <IconButton icon={<PlusIcon />} onPress={handleAddUser} />
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
              {students.map((users, i) => (
                <UserCard
                  key={i}
                  name={users.name}
                  second_name={users.second_name}
                  paternal_lastname={users.paternal_lastname}
                  maternal_lastname={users.maternal_lastname}
                  state={true}
                />
              ))}
            </ScrollView>
          )}
        </View>
        <View>
          {activeTab === 'Investigadores' && (
            <ScrollView>
              {researchers.map((users, i) => (
                <UserCard
                  key={i}
                  name={users.name}
                  second_name={users.second_name}
                  paternal_lastname={users.paternal_lastname}
                  maternal_lastname={users.maternal_lastname}
                  state={true}
                />
              ))}
            </ScrollView>
          )}
        </View>
        <View>
          {activeTab === 'Administradores' && (
            <ScrollView>
              {admins.map((users, i) => (
                <UserCard
                  key={i}
                  name={users.name}
                  second_name={users.second_name}
                  paternal_lastname={users.paternal_lastname}
                  maternal_lastname={users.maternal_lastname}
                  state={true}
                />
              ))}
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
