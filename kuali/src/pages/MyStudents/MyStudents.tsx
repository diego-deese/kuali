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
            user_id={student.user_id}
            name={student.name}
            paternal_lastname={student.paternal_lastname}
            project={student.project}
            identifier={student.identifier}
            role={student.role}
            institutional_email={student.institutional_email}
            index={index}
            students={assignedStudents}
          />
        ))}
      </ScrollView>
    </View>
  )
}
