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
    setStudents(students) // aquí se guarda toda la lista

    router.push({
      pathname: '/students/[id]',
      params: {
        id: student.user_id.toString(),
        name: student.name,
        paternal_lastname: student.paternal_lastname,
        identifier: student.identifier,
        role: student.role.name,
        //project: student.project,
        institutional_email: student.institutional_email,
        index: index.toString(),
      },
    })
  }

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.card}>
        <Text style={styles.name}>
          {student.name} {student.paternal_lastname}
        </Text>
        {/*  Como aun no esta conectado a la base de datos, por el momento solo dira project */}
        <Text style={styles.project}>{'Investigacion x'}</Text>
      </View>
    </Pressable>
  )
}
