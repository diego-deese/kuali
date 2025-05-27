import { View, Text, Image } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import styles from './infoStudents.styles'
import NavigationButtons from '../../components/MyStudents/NavStudents/NavStudents'
import { getStudents } from '../../context/StudentsStored'
import colors from '../../constants/colors'
import Button from '../../components/shared/Button/Button'
import userService from '../../services/user.service'

export default function InfoStudents() {
  const {
    user_id,
    name,
    paternal_lastname,
    identifier,
    institutional_email,
    index,
  } = useLocalSearchParams()
  const parsedIndex = parseInt(index as string)
  const parsedStudents = getStudents()

  const profilePhotoUrl = userService.getProfilePhotoUrl(Number(user_id))

  return (
    <View style={{ flex: 1, backgroundColor: colors.solidWhite }}>
      <View style={styles.container}>
        <Button
          buttonText='Volver a la lista'
          onPress={() => router.push('mystudents')}
        />

        {profilePhotoUrl ? (
          <Image
            source={{ uri: profilePhotoUrl }}
            style={styles.profileImage}
            resizeMode='cover'
          />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}

        {/* Nombre completo */}
        <Text style={styles.name}>
          {name} {paternal_lastname}
        </Text>

        {/* ID */}
        <View style={styles.idContainer}>
          <Text style={styles.idText}>{identifier}</Text>
        </View>

        {/* Rol fijo */}
        <Text style={styles.role}>Estudiante</Text>

        {/* Correo institucional */}
        <Text style={styles.info}>{institutional_email}</Text>
      </View>
      <View style={{ marginBottom: 100 }}>
        <NavigationButtons students={parsedStudents} index={parsedIndex} />
      </View>
    </View>
  )
}
