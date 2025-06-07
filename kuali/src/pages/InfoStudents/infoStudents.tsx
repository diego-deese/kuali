import { View, Text, Image } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import styles from './infoStudents.styles'
import NavStudents from '../../components/MyStudents/NavStudents/NavStudents'
import { getStudents } from '../../context/StudentsStored'
import colors from '../../constants/colors'
import { useProfilePhotoCheck } from '../../hooks/MyStudents/useProfilePhoto'

/**
 * InfoStudents screen displays detailed information about a selected student,
 * including profile photo, name, ID, email, and navigation between students.
 */
export default function InfoStudents() {
  // Extract parameters passed through the route
  const {
    user_id,
    name,
    paternal_lastname,
    identifier,
    institutional_email,
    index,
  } = useLocalSearchParams()
  // Convert the index to a number
  const parsedIndex = parseInt(index as string)
  // Get the full list of stored students (used for navigation)
  const parsedStudents = getStudents()
  // Build the profile image URL from the user service
  const userIdNumber = Number(user_id)
  const { profilePhotoUrl, showPlaceholder } =
    useProfilePhotoCheck(userIdNumber)
  console.log('Foto de perfil URL:', profilePhotoUrl)

  return (
    <View style={{ flex: 1, backgroundColor: colors.solidWhite }}>
      <View style={styles.container}>
        {/* Display profile photo if available, otherwise show a placeholder */}
        {showPlaceholder || !profilePhotoUrl ? (
          <View style={styles.imagePlaceholder} />
        ) : (
          <Image
            source={{ uri: profilePhotoUrl }}
            style={styles.profileImage}
            resizeMode='cover'
          />
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
        <NavStudents students={parsedStudents} index={parsedIndex} />
      </View>
    </View>
  )
}
