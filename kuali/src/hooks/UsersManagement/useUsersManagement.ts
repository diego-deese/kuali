import { useState } from 'react'
import { useGetUsers } from './useGetUsers'
import { router } from 'expo-router'
import { User } from '../../types/User'
import authService from '../../services/auth.service'
import userService from '../../services/user.service'
import academicProgramService from '../../services/academicProgram.service'
import Toast from 'react-native-toast-message'

export default function useUsersManagement() {
  const [activeTab, setActiveTab] = useState('Estudiantes')
  const { users, loading, error, refetch } = useGetUsers()
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [showConfirmationModalResearcher, setShowConfirmationModalResearcher] =
    useState(false)
  const [showConfirmationModalAdmin, setShowConfirmationModalAdmin] =
    useState(false)
  const [showProgramModal, setShowProgramModal] = useState(false)
  const [showProgramModalForResearchers, setShowProgramModalForResearchers] =
    useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [refreshing, setRefreshing] = useState(false)

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

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await refetch()
    } catch (err) {
      console.error('Error refreshing users:', err)
    } finally {
      setRefreshing(false)
    }

    setSelectedUser(null)
  }

  const handleAddUser = () => {
    router.push({ pathname: `/user/adduser` })
    setSelectedUser(null)
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

  const openConfirmationModalResearcher = (user: any) => {
    setSelectedUser(user)
    if (user.hasAcademicPrograms) {
      setShowConfirmationModalResearcher(true)
    } else {
      setShowProgramModalForResearchers(true)
    }
  }

  const openConfirmationModalAdmin = (user: any) => {
    setSelectedUser(user)
    setShowConfirmationModalAdmin(true)
  }

  const handleConfirmDeactivate = async () => {
    if (!selectedUser) return
    const token = await authService.getToken()
    if (!token) return console.log('Token expirado o sin acceso')

    const response = await userService.deactiveProfile(selectedUser.user_id)
    if ('success' in response && !response.success) {
      Toast.show({
        type: 'error',
        text1: response.message,
        text2: response.error,
      })
    } else {
      Toast.show({
        type: 'success',
        text1: 'Usuario desactivado con éxito',
      })
    }

    setSelectedUser(null)
    setShowConfirmationModal(false)
  }

  const handleConfirmAssign = async (programId: number) => {
    if (!selectedUser) return
    const token = await authService.getToken()
    if (!token) return console.log('Token expirado o sin acceso')

    const inscriptionData = {
      student_id: selectedUser.user_id,
      program_id: programId,
    }

    const response = await userService.assignStudent(inscriptionData)
    if ('success' in response && !response.success) {
      Toast.show({
        type: 'error',
        text1: response.message,
        text2: response.error,
      })
    } else {
      Toast.show({
        type: 'success',
        text1: 'Usuario inscrito con éxito',
        text2: `Usuario ${selectedUser.name} correctamente inscrito`,
      })
    }

    setSelectedUser(null)
    setShowProgramModal(false)
  }

  const handleConfirmAssignResearcher = async (programId: number) => {
    if (!selectedUser) return
    const token = await authService.getToken()
    if (!token) return console.log('Token expirado o sin acceso')

    const inscriptionData = {
      researcher_id: selectedUser.user_id,
      program_id: programId,
    }
    const response =
      await academicProgramService.assignResearcher(inscriptionData)
    if ('success' in response && !response.success) {
      Toast.show({
        type: 'error',
        text1: response.message,
        text2: response.error,
      })
    } else {
      Toast.show({
        type: 'success',
        text1: 'Usuario inscrito con éxito',
        text2: `Usuario ${selectedUser.name} correctamente inscrito`,
      })
    }

    setSelectedUser(null)
    setShowProgramModalForResearchers(false)
  }

  const handleConfirmDeactivateResearcher = async () => {
    if (!selectedUser) return
    const token = await authService.getToken()
    if (!token) return console.log('Token expirado o sin acceso')

    const researcher = await userService.getUserProfile(selectedUser.user_id)

    if ('success' in researcher && !researcher.success) {
      console.log('Error getting user profile:', researcher.message)
      return
    }

    const userProfile = researcher as User
    const programId =
      userProfile.academic_programs_as_researcher?.[0]?.program_id

    const inscriptionData = {
      researcher_id: selectedUser.user_id,
      program_id: programId,
    }

    const response =
      await academicProgramService.unassignResearcher(inscriptionData)
    if ('success' in response && !response.success) {
      Toast.show({
        type: 'error',
        text1: response.message,
        text2: response.error,
      })
    } else {
      Toast.show({
        type: 'success',
        text1: 'Usuario desactivado con éxito',
        text2: `Usuario ${selectedUser.name} desactivado`,
      })
    }

    setSelectedUser(null)
    setShowConfirmationModalResearcher(false)
  }

  const handleDeleteAdmin = async () => {
    if (!selectedUser) return
    const token = await authService.getToken()
    if (!token) return console.log('Token expirado o sin acceso')

    const response = await userService.deleteAdmin(selectedUser.user_id)
    if ('success' in response && !response.success) {
      Toast.show({
        type: 'error',
        text1: response.message,
        text2: response.error,
      })
    } else {
      Toast.show({
        type: 'success',
        text1: 'Cuenta de administrador eliminada con éxito',
        text2: `Cuenta de ${selectedUser.name} desactivada`,
      })
    }

    setSelectedUser(null)
    setShowConfirmationModalAdmin(false)
  }

  return {
    students,
    researchers,
    admins,
    loading,
    error,

    handleAddUser,
    handleOnEdit,
    handleGetInfo,
    openConfirmationModal,
    openConfirmationModalResearcher,
    openConfirmationModalAdmin,
    handleConfirmDeactivate,
    handleConfirmAssign,
    handleConfirmAssignResearcher,
    handleConfirmDeactivateResearcher,
    handleDeleteAdmin,

    activeTab,
    setActiveTab,
    showConfirmationModal,
    setShowConfirmationModal,
    showConfirmationModalResearcher,
    setShowConfirmationModalResearcher,
    showConfirmationModalAdmin,
    setShowConfirmationModalAdmin,
    showProgramModalForResearchers,
    setShowProgramModalForResearchers,
    showProgramModal,
    setShowProgramModal,
    refreshing,
    setRefreshing,
    handleRefresh,
  }
}
