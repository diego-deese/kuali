import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { styles } from './styles'
import { setStudents } from '../../../context/StudentsStored'

export default function NavigationButtons({
  index,
  students,
}: {
  index: number
  students: any[]
}) {
  const navigateTo = (newIndex: number) => {
    const nextStudent = students[newIndex]

    setStudents(students)

    router.push({
      pathname: '/students/[id]',
      params: {
        user_id: nextStudent.user_id.toString(),
        name: nextStudent.name,
        paternal_lastname: nextStudent.paternal_lastname,
        identifier: nextStudent.identifier,
        project: nextStudent.project,
        role: nextStudent.role,
        institutional_email: nextStudent.institutional_email,
        index: newIndex.toString(),
      },
    })
  }

  return (
    <View style={styles.container}>
      {index > 0 && (
        <TouchableOpacity onPress={() => navigateTo(index - 1)}>
          <Text style={styles.text}>← Anterior</Text>
        </TouchableOpacity>
      )}
      {index < students.length - 1 && (
        <TouchableOpacity onPress={() => navigateTo(index + 1)}>
          <Text style={styles.text}>Siguiente →</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
