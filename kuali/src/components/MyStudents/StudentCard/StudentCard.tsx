import { Pressable, Text, View } from 'react-native'
import { router } from 'expo-router'
import styles from './styles'
import { setStudents } from '../../../context/StudentsStored'
import { User } from '../../../types/User'
// Props for the StudentCard component
interface StudentCardProps {
  student: User // Current student to display
  index: number // Position of the student in the list
  students: User[] // Full list of students for navigation
}
/**
 * StudentCard represents an individual student in a list.
 * On press, it stores the student list globally and navigates
 * to the student's detailed information screen.
 */
export default function StudentCard({
  student,
  students,
  index,
}: StudentCardProps) {
  // When the card is pressed, store all students in context and navigate to the detail screen
  const handlePress = () => {
    setStudents(students) // Stores full list of students in global state (used later in InfoStudents)
    router.push({
      pathname: '/students/[id]', // Navigates to the student's detail screen
      params: {
        user_id: student.user_id,
        name: student.name,
        second_name: student.second_name,
        paternal_lastname: student.paternal_lastname,
        maternal_lastname: student.maternal_lastname,
        identifier: student.identifier,
        institutional_email: student.institutional_email,
        index: index.toString(), // Used to track position in the student list
      },
    })
  }

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.card}>
        <Text style={styles.name}>
          {student.name} {student.second_name} {student.paternal_lastname}
          {''} {student.maternal_lastname}
        </Text>
      </View>
    </Pressable>
  )
}
