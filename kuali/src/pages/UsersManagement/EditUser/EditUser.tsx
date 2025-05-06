import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import CreateUserForm from '../../../components/CreateUser/CreateUserForm'
import styles from '../../AddUser/AddUser.styles'
import Button from '../../../components/shared/Button/Button'
import { router } from 'expo-router'
import { useEditUser } from '../../../hooks/UsersManagement/useEditUser'

type EditUserProps = {
  userId: string
}

export default function EditUser({ userId }: EditUserProps) {
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
            <Text>{userId}</Text>
          </ScrollView>
        </View>
        <View style={styles.buttonsContainer}>
          <Button buttonText='Cancelar' onPress={handleGoingBack} />
          <Button buttonText='Crear usuario' onPress={handleGoingBack} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
