import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { styles } from './styles'
import { setStudents } from '../../../context/StudentsStored'

interface Student {
  id: number
  name: string
  project: string
  role: string
  email: string
}

interface Props {
  students: Student[]
  currentIndex: number
}

export default function NavigationButtons({ students, currentIndex }: Props) {
  const navigateTo = (newIndex: number) => {
    const nextStudent = students[newIndex]

    setStudents(students)

    router.push({
      pathname: '/students/[id]',
      params: {
        id: nextStudent.id.toString(),
        name: nextStudent.name,
        project: nextStudent.project,
        role: nextStudent.role,
        email: nextStudent.email,
        index: newIndex.toString(),
      },
    })
  }

  return (
    <View style={styles.container}>
      {currentIndex > 0 && (
        <TouchableOpacity onPress={() => navigateTo(currentIndex - 1)}>
          <Text style={styles.text}>← Anterior</Text>
        </TouchableOpacity>
      )}
      {currentIndex < students.length - 1 && (
        <TouchableOpacity onPress={() => navigateTo(currentIndex + 1)}>
          <Text style={styles.text}>Siguiente →</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
