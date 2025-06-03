import { View, Text, Image } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import styles from './infoStudents.styles'
import NavStudents from '../../components/MyStudents/NavStudents/NavStudents'
import { getStudents } from '../../context/StudentsStored'
import colors from '../../constants/colors'
import userService from '../../services/user.service'
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
  const profilePhotoUrl = userService.getProfilePhotoUrl(Number(user_id))

  return (
    <View style={{ flex: 1, backgroundColor: colors.solidWhite }}>
      <View style={styles.container}>
        {/* Display profile photo if available, otherwise show a placeholder */}
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
        <NavStudents students={parsedStudents} index={parsedIndex} />
      </View>
    </View>
  )
}
