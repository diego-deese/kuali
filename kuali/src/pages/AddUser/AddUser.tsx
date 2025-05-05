import { View, Text } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import styles from './AddUser.styles'
import Button from '../../components/shared/Button/Button'
import CreateUserForm from '../../components/CreateUser/CreateUserForm'
import { ScrollView } from 'react-native'
import { useCreateUser } from '../../hooks/UsersManagement/useCreateUser'

export default function AddUser() {
  const userForm = useCreateUser()

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Crear usuario</Text>
        </View>
        <View style={styles.inputsContainer}>
          <ScrollView>
            <CreateUserForm {...userForm} />
          </ScrollView>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            buttonText='Cancelar'
            onPress={() => console.log('Cancelar')}
          />
          <Button buttonText='Crear usuario' onPress={userForm.createUser} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
