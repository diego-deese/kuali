import React from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import styles from './myStudents.styles'
import StudentCard from '../../components/MyStudents/StudentCard/StudentCard'
import { useAssignedStudents } from '../../hooks/MyStudents/useAssignedStudents'

export default function MyStudents() {
  const { students, loading } = useAssignedStudents()

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
            key={student.user_id}
            student={student}
            index={index}
            students={students}
          />
        ))}
      </ScrollView>
    </View>
  )
}
