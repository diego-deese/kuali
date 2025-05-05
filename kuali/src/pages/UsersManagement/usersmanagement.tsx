import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import IconButton from '../../components/shared/IconButton/IconButton'
import styles from './usersmanagement.styles'
import UserCard from '../../components/UserCard/UserCard'
import { PlusIcon } from '../../components/shared/Icons/Icons'
import { router } from 'expo-router'
import { useGetUsers } from '../../hooks/UsersManagement/useGetUsers'

export default function UsersManagement() {
  const [activeTab, setActiveTab] = useState('Estudiantes')
  const { users, loading, error } = useGetUsers()

  const students = (users ?? []).filter(
    (user) => user.role?.name === 'Estudiante',
  )
  const researchers = (users ?? []).filter(
    (user) => user.role?.name === 'Investigador',
  )
  const admins = (users ?? []).filter(
    (user) => user.role?.name === 'Administrador',
  )

  const handleAddUser = () => {
    router.push({ pathname: `/user/adduser` })
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}> Gestión de usuarios </Text>
          <IconButton icon={<PlusIcon />} onPress={handleAddUser} />
        </View>

        <View style={styles.tabs}>
          {['Estudiantes', 'Investigadores', 'Administradores'].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
              <Text
                style={
                  activeTab === tab ? styles.activeTab : styles.inactiveTab
                }
              >
                {' '}
                {tab}{' '}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading ? (
          <Text style={styles.textLoading}>Cargando usuarios...</Text>
        ) : error ? (
          <Text style={styles.textError}>{error}</Text>
        ) : (
          <>
            {activeTab === 'Estudiantes' && (
              <ScrollView>
                {students.map((user, i) => (
                  <UserCard
                    user_id={user.user_id}
                    key={i}
                    name={user.name}
                    second_name={user.second_name}
                    paternal_lastname={user.paternal_lastname}
                    maternal_lastname={user.maternal_lastname}
                    state={true}
                  />
                ))}
              </ScrollView>
            )}
            {activeTab === 'Investigadores' && (
              <ScrollView>
                {researchers.map((user, i) => (
                  <UserCard
                    user_id={user.user_id}
                    key={i}
                    name={user.name}
                    second_name={user.second_name}
                    paternal_lastname={user.paternal_lastname}
                    maternal_lastname={user.maternal_lastname}
                    state={true}
                  />
                ))}
              </ScrollView>
            )}
            {activeTab === 'Administradores' && (
              <ScrollView>
                {admins.map((user, i) => (
                  <UserCard
                    user_id={user.user_id}
                    key={i}
                    name={user.name}
                    second_name={user.second_name}
                    paternal_lastname={user.paternal_lastname}
                    maternal_lastname={user.maternal_lastname}
                    state={true}
                  />
                ))}
              </ScrollView>
            )}
          </>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
