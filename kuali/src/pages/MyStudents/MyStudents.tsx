import React from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import styles from './myStudents.styles'
import StudentCard from '../../components/MyStudents/StudentCard/StudentCard'
import { useAssignedStudents } from '../../hooks/MyStudents/useAssignedStudents'
/**
 * MyStudents displays a list of students assigned to the current professor or reviewer.
 * It fetches the data using a custom hook and renders each student inside a StudentCard.
 */
export default function MyStudents() {
  // Load students and loading state from custom hook
  const { students, loading } = useAssignedStudents()
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
      <Text style={styles.title}>Estudiantes asignados</Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
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
