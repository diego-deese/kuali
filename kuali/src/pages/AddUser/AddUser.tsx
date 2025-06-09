import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import styles from './AddUser.styles'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/shared/Button/Button'
import CreateUserForm from '../../components/CreateUser/CreateUserForm'
import { UserFormProvider } from '../../context/UserFormContext/UserFormContext'
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
                  <Text style={styles.title}>Crear usuario</Text>
                </View>
                <View style={styles.inputsContainer}>
                  <CreateUserForm onEditing={false} />
                </View>
                <View style={styles.buttonsContainer}>
                  <View>
                    <Button buttonText='Cancelar' onPress={handleGoingBack} />
                  </View>
                  <View>
                    <Button buttonText='Crear usuario' onPress={createUser} />
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

export default function AddUser() {
  return (
    <UserFormProvider mode='create'>
      <AddUserContent />
    </UserFormProvider>
  )
}
