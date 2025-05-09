import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import CreateUserForm from '../../../components/CreateUser/CreateUserForm'
import styles from '../../AddUser/AddUser.styles'
import Button from '../../../components/shared/Button/Button'
import { router } from 'expo-router'
import { useEditUser } from '../../../hooks/UsersManagement/useEditUser'
import { use } from 'react'

type EditUserProps = {
  userId: string
}

export default function EditUser({ userId }: EditUserProps) {
  const {
    name,
    setName,
    secondName,
    setSecondName,
    paternalLastName,
    setPaternalLastName,
    maternalLastName,
    setMaternalLastName,
    institutionalEmail,
    setInstitutionalEmail,
    identifier,
    setIdentifier,
    curp,
    setCurp,
    role,
    setRole,
    password,
    setPassword,
    loading,
    error,
    updateUser,
  } = useEditUser(userId)

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
              role={role?.role_id}
              name={name}
              secondName={secondName}
              paternalLastName={paternalLastName}
              maternalLastName={maternalLastName}
              email={institutionalEmail}
              password={password}
              identifier={identifier}
              curp={curp}
              setRole={(id) => setRole({ role_id: id, name: '' })}
              setName={setName}
              setSecondName={setSecondName}
              setPaternalLastName={setPaternalLastName}
              setMaternalLastName={setMaternalLastName}
              setEmail={setInstitutionalEmail}
              setPassword={setPassword}
              setIdentifier={setIdentifier}
              setCURP={setCurp}
              onEditing={true}
            />
          </ScrollView>
        </View>
        <View style={styles.buttonsContainer}>
          <Button buttonText='Cancelar' onPress={handleGoingBack} />
          <Button buttonText='Editar usuario' onPress={updateUser} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
