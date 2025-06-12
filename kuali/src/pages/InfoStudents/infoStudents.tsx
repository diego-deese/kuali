import { View, Text, Image, ScrollView, RefreshControl } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import styles from './infoStudents.styles'
import NavStudents from '../../components/MyStudents/NavStudents/NavStudents'
import colors from '../../constants/colors'
import { useProfilePhotoCheck } from '../../hooks/MyStudents/useProfilePhoto'
import { useAssignedStudents } from '../../hooks/MyStudents/useAssignedStudents'
/**
 * InfoStudents screen displays detailed information about a selected student,
 * including profile photo, name, ID, email, and navigation between students.
 */
export default function InfoStudents() {
  const { user_id, index } = useLocalSearchParams()
  // Build the profile image URL from the user service
  const userIdNumber = Number(user_id)
  // Convert the index to a number
  const parsedIndex = parseInt(index as string)
  const { students, refreshing, handleRefresh, loading } = useAssignedStudents()
  const student = students.find((s) => s.user_id === userIdNumber)
  const { profilePhotoUrl, showPlaceholder } =
    useProfilePhotoCheck(userIdNumber)

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.info}>Cargando estudiante...</Text>
      </View>
    )
  }
  if (!student) {
    return (
      <View style={styles.container}>
        <Text style={styles.info}>No se encontró el estudiante</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.solidWhite }}>
      {/* Scrollable and refresh */}
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.selectionBlue}
            colors={[colors.selectionBlue]}
          />
        }
      >
        {/* Student Info */}
        {showPlaceholder || !profilePhotoUrl ? (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagetext}>Sin foto</Text>
          </View>
        ) : (
          <Image
            source={{ uri: profilePhotoUrl }}
            style={styles.profileImage}
            resizeMode='cover'
          />
        )}

        <Text style={styles.name}>
          {[
            student.name,
            student.second_name,
            student.paternal_lastname,
            student.maternal_lastname,
          ]
            .filter(Boolean)
            .join(' ')}
        </Text>

        <View style={styles.idContainer}>
          <Text style={styles.idText}>{student.identifier}</Text>
        </View>

        <Text style={styles.role}>Estudiante</Text>
        <Text style={styles.info}>{student.institutional_email}</Text>
      </ScrollView>

      {/* Nav */}
      <View style={{ marginBottom: '20%' }}>
        <NavStudents students={students} index={parsedIndex} />
      </View>
    </View>
  )
}
