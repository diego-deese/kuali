import React from 'react'
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import styles from './myStudents.styles'
import StudentCard from '../../components/MyStudents/StudentCard/StudentCard'
import { useAssignedStudents } from '../../hooks/MyStudents/useAssignedStudents'
import colors from '../../constants/colors'
/**
 * MyStudents displays a list of students assigned to the current professor or reviewer.
 * It fetches the data using a custom hook and renders each student inside a StudentCard.
 */
export default function MyStudents() {
  // Load students and loading state from custom hook
  const { students, loading, refreshing, handleRefresh } = useAssignedStudents()
  // Show a loading indicator while data is being fetched
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#007AFF' />
        <Text style={styles.title}>Cargando estudiantes...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.selectionBlue}
            colors={[colors.selectionBlue]}
          />
        }
      >
        <Text style={styles.title}>Estudiantes asignados</Text>
        {students.map((student, index) => (
          <StudentCard
            key={student.user_id} // Unique identifier for the student
            student={student}
            index={index}
            students={students}
          />
        ))}
      </ScrollView>
    </View>
  )
}
