import { Pressable, Text, View } from 'react-native'
import { router } from 'expo-router'
import styles from './styles'
import { setStudents } from '../../../context/StudentsStored'
import { User } from '../../../types/User'

interface StudentCardProps {
  student: User
  index: number
  students: User[]
}

export default function StudentCard({
  student,
  students,
  index,
}: StudentCardProps) {
  const handlePress = () => {
    setStudents(students)

    router.push({
      pathname: '/students/[id]',
      params: {
        id: student.user_id.toString(),
        name: student.name,
        second_name: student.second_name,
        paternal_lastname: student.paternal_lastname,
        maternal_lastname: student.maternal_lastname,
        identifier: student.identifier,
        institutional_email: student.institutional_email,
        index: index.toString(),
      },
    })
  }

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.card}>
        <Text style={styles.name}>
          {student.name} {student.second_name} {student.paternal_lastname} {student.maternal_lastname}
        </Text>
        {/*
        <Text style={styles.project}>{'Investigacion x'}</Text>
        */}
      </View>
    </Pressable>
  )
}
