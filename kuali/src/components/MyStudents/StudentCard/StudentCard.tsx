import { Pressable, Text, View } from 'react-native'
import { router } from 'expo-router'
import styles from './styles'
import { setStudents } from '../../../context/StudentsStored'

export default function StudentCard({
  user_id,
  name,
  paternal_lastname,
  project,
  identifier,
  role,
  institutional_email,
  index,
  students,
}: {
  user_id: number
  name: string
  paternal_lastname: string
  project: string
  identifier: string
  role: string
  institutional_email: string
  index: number
  students: any[]
}) {
  const handlePress = () => {
    setStudents(students)

    router.push({
      pathname: '/students/[id]',
      params: {
        id: user_id.toString(),
        name,
        paternal_lastname,
        identifier,
        role,
        project,
        institutional_email,
        index: index.toString(),
      },
    })
  }

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.card}>
        <Text style={styles.name}>
          {name} {paternal_lastname}
        </Text>
        <Text style={styles.project}>{project}</Text>
      </View>
    </Pressable>
  )
}
