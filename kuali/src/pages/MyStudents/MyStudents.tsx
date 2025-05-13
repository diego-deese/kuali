import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import styles from './myStudents.styles'
import StudentCard from '../../components/MyStudents/StudentCard/StudentCard'
import { setStudents } from '../../context/StudentsStored'

const assignedStudents = [
  {
    user_id: 1,
    name: 'Juan',
    paternal_lastname: 'Pi',
    identifier: 'IPN000001',
    role: 'ESTUDIANTE',
    project: 'Investigación 1',
    institutional_email: 'contacto1@ipn.mx',
  },
  {
    user_id: 2,
    name: 'Sahid',
    paternal_lastname: 'Diego',
    identifier: 'IPN000002',
    role: 'ESTUDIANTE',
    project: 'Investigación 2',
    institutional_email: 'contacto2@ipn.mx',
  },
  {
    user_id: 3,
    name: 'Erick',
    paternal_lastname: 'Blas',
    identifier: 'IPN000003',
    role: 'ESTUDIANTE',
    project: 'Investigación 3',
    institutional_email: 'contacto3@ipn.mx',
  },
]

export default function MyStudents() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estudiantes asignados</Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {assignedStudents.map((student, index) => (
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
