import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import styles from './myStudents.styles'
import StudentCard from '../../components/MyStudents/StudentCard/StudentCard'
import { assignedStudents } from '../../components/DataExample/Students'
//import { setStudents } from '../../context/StudentsStored'

export default function MyStudents() {
  const [students] = useState(assignedStudents)

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
