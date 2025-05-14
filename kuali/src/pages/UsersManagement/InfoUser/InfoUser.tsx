import { View, Text } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import styles from './InfoUser.styles'
import { useGetSingleUser } from '../../../hooks/UsersManagement/useGetSingleUser'

type InfoUserProps = {
  userId: string
}

export default function InfoUser({ userId }: InfoUserProps) {
  const { userInfo } = useGetSingleUser(userId)

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Información del usuario</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.atributeTitle}>Nombre completo</Text>
          <Text style={styles.atributeValue}>
            {userInfo?.name} {userInfo?.second_name}{' '}
            {userInfo?.paternal_lastname} {userInfo?.maternal_lastname}
          </Text>
          <Text style={styles.atributeTitle}>Correo institucional</Text>
          <Text style={styles.atributeValue}>
            {userInfo?.institutional_email}
          </Text>
          <Text style={styles.atributeTitle}>Identificador</Text>
          <Text style={styles.atributeValue}>{userInfo?.identifier}</Text>
          <Text style={styles.atributeTitle}>CURP</Text>
          <Text style={styles.atributeValue}>
            {userInfo?.curp || 'Dato no registrado'}
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
