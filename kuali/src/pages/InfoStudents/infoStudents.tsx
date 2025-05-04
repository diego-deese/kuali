import { View, Text, Image } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import styles from './infoStudents.styles'

export default function InfoStudents() {
  const { id, name, role, project, email } = useLocalSearchParams()

  return (
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
  )
}
