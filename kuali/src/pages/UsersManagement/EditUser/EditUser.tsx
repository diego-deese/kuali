import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import CreateUserForm from '../../../components/CreateUser/CreateUserForm'
import styles from '../../AddUser/AddUser.styles'
import Button from '../../../components/shared/Button/Button'
import { router } from 'expo-router'
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps='handled'
              keyboardDismissMode='interactive'
            >
              <View style={styles.container}>
                <View style={styles.headerContainer}>
                  <Text style={styles.title}>Editar usuario</Text>
                </View>
                <View style={styles.inputsContainer}>
                  <CreateUserForm onEditing={true} />
                </View>
                <View style={styles.buttonsContainer}>
                  <View>
                    <Button buttonText='Cancelar' onPress={handleGoingBack} />
                  </View>
                  <View>
                    <Button
                      buttonText='Editar usuario'
                      onPress={handleUpdateUser}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
