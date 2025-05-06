import { View, Text } from 'react-native'
import styles from './AddUser.styles'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/shared/Button/Button'
import CreateUserForm from '../../components/CreateUser/CreateUserForm'
import { ScrollView } from 'react-native'
import { useCreateUser } from '../../hooks/UsersManagement/useCreateUser'
import { router } from 'expo-router'

export default function AddUser() {
  const userForm = useCreateUser()

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
            <CreateUserForm
              {...userForm}
              setRole={(role_id: number) =>
                userForm.setRole((prev) => ({ ...prev, role_id }))
              }
            />
          </ScrollView>
        </View>
        <View style={styles.buttonsContainer}>
          <Button buttonText='Cancelar' onPress={handleGoingBack} />
          <Button buttonText='Crear usuario' onPress={userForm.createUser} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
