import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import CreateUserForm from '../../../components/CreateUser/CreateUserForm'
import styles from '../../AddUser/AddUser.styles'
import Button from '../../../components/shared/Button/Button'
import { router } from 'expo-router'
import { useEditUser } from '../../../hooks/UsersManagement/useEditUser'
import { use } from 'react'
import { useUserFormContext } from '../../../context/UserFormContext/UserFormContext'
import { UserFormProvider } from '../../../context/UserFormContext/UserFormContext'

type EditUserProps = {
  userId: string
}

const EditUserContent = () => {
  const { updateUser, loading, error } = useUserFormContext()

  const handleGoingBack = () => {
    router.back()
  }

  const handleUpdateUser = async () => {
    const success = await updateUser()
    if (success) {
    }
  }

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Cargando...</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    )
  }

  if (error) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Error: {error}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <Button buttonText='Volver' onPress={handleGoingBack} />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Editar usuario</Text>
        </View>
        <View style={styles.inputsContainer}>
          <ScrollView>
            <CreateUserForm onEditing={true} />
          </ScrollView>
        </View>
        <View style={styles.buttonsContainer}>
          <Button buttonText='Cancelar' onPress={handleGoingBack} />
          <Button buttonText='Editar usuario' onPress={handleUpdateUser} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default function EditUser({ userId }: EditUserProps) {
  return (
    <UserFormProvider mode='edit' userId={Number(userId)}>
      <EditUserContent />
    </UserFormProvider>
  )
}
