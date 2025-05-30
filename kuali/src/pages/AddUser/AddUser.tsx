import { View, Text } from 'react-native'
import styles from './AddUser.styles'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/shared/Button/Button'
import CreateUserForm from '../../components/CreateUser/CreateUserForm'
import { ScrollView } from 'react-native'
import { UserFormProvider } from '../../context/UserFormContext/UserFormContext'
import { useUserForm } from '../../context/UserFormContext/useUserForm'
import { useUserFormContext } from '../../context/UserFormContext/UserFormContext'
import { router } from 'expo-router'

const AddUserContent = () => {
  const { createUser } = useUserFormContext()

  const handleGoingBack = () => {
    router.back()
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Crear usuario</Text>
        </View>
        <View style={styles.inputsContainer}>
          <ScrollView>
            <CreateUserForm onEditing={false} />
          </ScrollView>
        </View>
        <View style={styles.buttonsContainer}>
          <Button buttonText='Cancelar' onPress={handleGoingBack} />
          <Button buttonText='Crear usuario' onPress={createUser} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default function AddUser() {
  return (
    <UserFormProvider mode='create'>
      <AddUserContent />
    </UserFormProvider>
  )
}
