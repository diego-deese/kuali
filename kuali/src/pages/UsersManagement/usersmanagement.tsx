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
import authService from '../../services/auth.service'
import userService from '../../services/user.service'
import ConfirmationModal from '../../components/shared/ConfirmationModal/ConfirmationModal'
import colors from '../../constants/colors'
import AcademicProgramsModal from '../../components/shared/AcademicProgramsModal/AcademicProgramsModal'

export default function UsersManagement() {
  const [activeTab, setActiveTab] = useState('Estudiantes')
  const { users, loading, error } = useGetUsers()
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [showProgramModal, setShowProgramModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const students = (users ?? [])
    .filter((user) => user.role?.name === 'Estudiante')
    .map((user) => ({
      ...user,
      hasAcademicPrograms: user.academic_programs_as_student.length > 0,
    }))

  const researchers = (users ?? [])
    .filter((user) => user.role?.name === 'Investigador')
    .map((researcher) => ({
      ...researcher,
      hasAcademicPrograms:
        researcher.academic_programs_as_researcher.length > 0,
    }))

  const admins = (users ?? []).filter(
    (user) => user.role?.name === 'Administrador',
  )

  const handleAddUser = () => {
    router.push({ pathname: `/user/adduser` })
  }

  const handleOnEdit = (userId: number) => {
    router.push(`/user/edituser/${userId}`)
  }

  const handleGetInfo = (userId: number) => {
    router.push(`/user/infouser/${userId}`)
  }

  const openConfirmationModal = (user: any) => {
    setSelectedUser(user)
    if (user.hasAcademicPrograms) {
      setShowConfirmationModal(true)
    } else {
      setShowProgramModal(true)
    }
  }

  const handleConfirmDeactivate = async () => {
    if (!selectedUser) return
    const token = await authService.getToken()
    if (!token) return console.log('Token expirado o sin acceso')

    const response = await userService.deactiveProfile(selectedUser.user_id)
    if ('success' in response && !response.success) {
      console.error(response.error)
    } else {
      console.log('Usuario desactivado con éxito')
    }

    setSelectedUser(null)
    setShowConfirmationModal(false)
  }

  const handleConfirmAssign = async (programId: number) => {
    if (!selectedUser) return
    const token = await authService.getToken()
    if (!token) return console.log('Token expirado o sin acceso')

    // const response = await userService.assignStudent(
    //   programId,
    //   selectedUser.user_id,
    // )
    // if ('success' in response && !response.success) {
    //   console.error(response.error)
    // } else {
    //   console.log('Estudiante reactivado e inscrito')
    // }

    setSelectedUser(null)
    setShowProgramModal(false)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}> Gestión de usuarios</Text>
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
                    state={user.hasAcademicPrograms}
                    onGetInfoPress={() => handleGetInfo(user.user_id)}
                    onEditPress={() => handleOnEdit(user.user_id)}
                    onDeactivatePress={() => openConfirmationModal(user)}
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
                    state={user.hasAcademicPrograms}
                    onGetInfoPress={() => handleGetInfo(user.user_id)}
                    onEditPress={() => handleOnEdit(user.user_id)}
                    onDeactivatePress={openConfirmationModal}
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
                    onGetInfoPress={() => handleGetInfo(user.user_id)}
                    onEditPress={() => handleOnEdit(user.user_id)}
                    onDeactivatePress={openConfirmationModal}
                  />
                ))}
              </ScrollView>
            )}
          </>
        )}
        <ConfirmationModal
          visible={showConfirmationModal}
          title='Desactivar usuario'
          description='¿Estás seguro de que deseas desactivar este usuario?'
          confirmButtonText='Desactivar'
          confirmButtonColor={colors.warningRed}
          onConfirm={handleConfirmDeactivate}
          onCancel={() => setShowConfirmationModal(false)}
        />

        <AcademicProgramsModal
          visible={showProgramModal}
          onConfirm={handleConfirmAssign}
          onCancel={() => setShowProgramModal(false)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
