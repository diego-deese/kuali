import { View, Text, Image } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import styles from './infoStudents.styles'
import NavigationButtons from '../../components/MyStudents/NavigationButtons/NavigationButtons'
import { getStudents } from '../../context/StudentsStored'
import colors from '../../constants/colors'

export default function InfoStudents() {
  const { id, name, role, project, email, index } = useLocalSearchParams()

  const parsedIndex = parseInt(index as string)
  const parsedStudents = getStudents()

  return (
    <View style={{ flex: 1, backgroundColor: colors.solidWhite }}>
      <View style={styles.container}>
        {/* Círculo para la imagen */}
        <View style={styles.imagePlaceholder} />

        {/* Nombre */}
        <Text style={styles.name}>{name}</Text>

        {/* ID simulado */}
        <View style={styles.idContainer}>
          <Text style={styles.idText}>{id}</Text>
        </View>

        {/* Rol */}
        <Text style={styles.role}>{role}</Text>

        {/* Proyecto */}
        <Text style={styles.info}>{project}</Text>

        {/* Correo */}
        <Text style={styles.info}>{email}</Text>
      </View>
      <NavigationButtons students={parsedStudents} currentIndex={parsedIndex} />
    </View>
  )
}
