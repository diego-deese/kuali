import { View, Text } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Input from '../../components/shared/InputText/InputText'
import styles from './AddUser.styles'
import Button from '../../components/shared/Button/Button'

export default function AddUser() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Crear usuario</Text>
        </View>
        <View style={styles.inputsContainer}>
          <Input label='Nombre' returnKeyType='next' />
          <Input label='Correo' returnKeyType='next' inputMode='email' />
          <Input label='Matrícula' returnKeyType='next' />
          <Input label='CURP' returnKeyType='next' />
        </View>
        <View style={styles.buttonsContainer}>
          <Button buttonText='Cancelar'></Button>
          <Button buttonText='Crear usuario'></Button>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
