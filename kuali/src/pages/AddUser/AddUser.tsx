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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const AddUserContent = () => {
  const { createUser } = useUserFormContext()
  const handleGoingBack = () => {
    router.back()
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAwareScrollView
            extraScrollHeight={80}
            enableOnAndroid
            keyboardShouldPersistTaps='handled'
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 300 }}
          >
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <Text style={styles.title}>Crear usuario</Text>
              </View>

              <View style={styles.inputsContainer}>
                <CreateUserForm onEditing={false} />
              </View>

              <View style={styles.buttonsContainer}>
                <Button buttonText='Cancelar' onPress={handleGoingBack} />
                <Button buttonText='Crear usuario' onPress={createUser} />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
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
