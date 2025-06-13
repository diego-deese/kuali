import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import IconButton from '../../components/shared/IconButton/IconButton'
import styles from './usersmanagement.styles'
import UserCard from '../../components/UserCard/UserCard'
import { PlusIcon } from '../../components/shared/Icons/Icons'
import ConfirmationModal from '../../components/shared/ConfirmationModal/ConfirmationModal'
import colors from '../../constants/colors'
import AcademicProgramsModal from '../../components/shared/AcademicProgramsModal/AcademicProgramsModal'
import useUsersManagement from '../../hooks/UsersManagement/useUsersManagement'

export default function UsersManagement() {
  const {
    activeTab,
    setActiveTab,
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
    showConfirmationModal,
    setShowConfirmationModal,
    showConfirmationModalResearcher,
    setShowConfirmationModalResearcher,
    showConfirmationModalAdmin,
    setShowConfirmationModalAdmin,
    showProgramModal,
    setShowProgramModal,
    showProgramModalForResearchers,
    setShowProgramModalForResearchers,
    refreshing,
    setRefreshing,
    handleRefresh,
  } = useUsersManagement()

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}> Gestión de usuarios </Text>
          <IconButton icon={<PlusIcon size={26} />} onPress={handleAddUser} />
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
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    tintColor={colors.selectionBlue}
                    colors={[colors.selectionBlue]}
                  />
                }
              >
                {students.map((user, i) => (
                  <UserCard
                    user_id={user.user_id}
                    key={i}
                    name={user.name}
                    second_name={user.second_name}
                    paternal_lastname={user.paternal_lastname}
                    maternal_lastname={user.maternal_lastname}
                    state={user.hasAcademicPrograms}
                    isAdmin={false}
                    onGetInfoPress={() => handleGetInfo(user.user_id)}
                    onEditPress={() => handleOnEdit(user.user_id)}
                    onAddProgramPress={() => openConfirmationModal(user, true)}
                    onDeactivatePress={() => openConfirmationModal(user, false)}
                  />
                ))}
              </ScrollView>
            )}
            {activeTab === 'Investigadores' && (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    tintColor={colors.selectionBlue}
                    colors={[colors.selectionBlue]}
                  />
                }
              >
                {researchers.map((user, i) => (
                  <UserCard
                    user_id={user.user_id}
                    key={i}
                    name={user.name}
                    second_name={user.second_name}
                    paternal_lastname={user.paternal_lastname}
                    maternal_lastname={user.maternal_lastname}
                    state={user.hasAcademicPrograms}
                    isAdmin={false}
                    onGetInfoPress={() => handleGetInfo(user.user_id)}
                    onEditPress={() => handleOnEdit(user.user_id)}
                    onAddProgramPress={() =>
                      openConfirmationModalResearcher(user, true)
                    }
                    onDeactivatePress={() =>
                      openConfirmationModalResearcher(user, false)
                    }
                  />
                ))}
              </ScrollView>
            )}
            {activeTab === 'Administradores' && (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    tintColor={colors.selectionBlue}
                    colors={[colors.selectionBlue]}
                  />
                }
              >
                {admins.map((user, i) => (
                  <UserCard
                    user_id={user.user_id}
                    key={i}
                    name={user.name}
                    second_name={user.second_name}
                    paternal_lastname={user.paternal_lastname}
                    maternal_lastname={user.maternal_lastname}
                    state={true}
                    isAdmin={true}
                    onGetInfoPress={() => handleGetInfo(user.user_id)}
                    onEditPress={() => handleOnEdit(user.user_id)}
                    onDeactivatePress={() => openConfirmationModalAdmin(user)}
                  />
                ))}
              </ScrollView>
            )}
          </>
        )}
        <ConfirmationModal
          visible={showConfirmationModal}
          variant='delete'
          title='Desactivar estudiante'
          description='¿Estás seguro de que deseas realizar esta acción? Se desvinculara al estudiante de su programa académico.'
          confirmButtonText='Desactivar'
          confirmButtonColor={colors.warningRed}
          onConfirm={handleConfirmDeactivate}
          onCancel={() => setShowConfirmationModal(false)}
        />

        <ConfirmationModal
          visible={showConfirmationModalResearcher}
          variant='delete'
          title='Desactivar investigador'
          description='¿Estás seguro de que deseas realizar esta acción? Se desvinculara al investigador de su programa académico.'
          confirmButtonText='Desactivar'
          confirmButtonColor={colors.warningRed}
          onConfirm={handleConfirmDeactivateResearcher}
          onCancel={() => setShowConfirmationModalResearcher(false)}
        />

        <ConfirmationModal
          visible={showConfirmationModalAdmin}
          variant='delete'
          title='Eliminar administrador'
          description='¿Estás seguro de que deseas realizar esta acción? Se eliminará permanentemente la cuenta del administrador.'
          confirmButtonText='Eliminar'
          confirmButtonColor={colors.warningRed}
          onConfirm={handleDeleteAdmin}
          onCancel={() => setShowConfirmationModalAdmin(false)}
        />

        <AcademicProgramsModal
          available={true}
          visible={showProgramModal}
          onConfirm={handleConfirmAssign}
          onCancel={() => setShowProgramModal(false)}
        />
        <AcademicProgramsModal
          available={false}
          visible={showProgramModalForResearchers}
          onConfirm={handleConfirmAssignResearcher}
          onCancel={() => setShowProgramModalForResearchers(false)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
