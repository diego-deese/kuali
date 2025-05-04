import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import styles from './myStudents.styles'
import { setStudents } from '../../context/StudentsStored'

const assignedStudents = [
  {
    id: 1,
    name: 'Nombre Estudiante 1',
    role: 'ESTUDIANTE',
    project: 'Investigación 1',
    email: 'contacto1@ipn.mx',
  },
  {
    id: 2,
    name: 'Nombre Estudiante 2',
    role: 'ESTUDIANTE',
    project: 'Investigación 2',
    email: 'contacto2@ipn.mx',
  },
  {
    id: 3,
    name: 'Nombre Estudiante 3',
    role: 'ESTUDIANTE',
    project: 'Investigación 3',
    email: 'contacto3@ipn.mx',
  },
]

export default function MyStudents() {
  const handlePress = (student) => {
    setStudents(assignedStudents)
    router.push({
      pathname: '/students/[id]',
      params: {
        id: student.id.toString(),
        name: student.name,
        role: student.role,
        project: student.project,
        email: student.email,
        index: assignedStudents
          .findIndex((s) => s.id === student.id)
          .toString(),
      },
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estudiantes asignados</Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {assignedStudents.map((student) => (
          <TouchableOpacity
            key={student.id}
            onPress={() => handlePress(student)}
            style={styles.card}
          >
            <Text style={styles.name}>{student.name}</Text>
            <Text style={styles.project}>{student.project}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}
