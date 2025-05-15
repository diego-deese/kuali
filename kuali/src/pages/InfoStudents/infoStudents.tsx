import { View, Text, Image } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import styles from './infoStudents.styles'
import NavigationButtons from '../../components/MyStudents/NavigationButtons/NavigationButtons'
import { getStudents } from '../../context/StudentsStored'
import colors from '../../constants/colors'
import Button from '../../components/shared/Button/Button'

export default function InfoStudents() {
  const {
    user_id,
    name,
    paternal_lastname,
    identifier,
    role,
    //project,
    institutional_email,
    index,
  } = useLocalSearchParams()

  const parsedIndex = parseInt(index as string)
  const parsedStudents = getStudents()

  return (
    <View style={{ flex: 1, backgroundColor: colors.solidWhite }}>
      <View style={styles.container}>
        <Button
          buttonText='Volver a la lista'
          onPress={() => router.push('mystudents')}
        />

        {/* Círculo para la imagen */}
        <View style={styles.imagePlaceholder} />

        {/* Nombre */}
        <Text style={styles.name}>
          {name} {paternal_lastname}
        </Text>

        {/* ID simulado */}
        <View style={styles.idContainer}>
          <Text style={styles.idText}>{identifier}</Text>
        </View>

        {/* Rol */}
        <Text style={styles.role}>{role}</Text>

        {/* Proyecto */}
        <Text style={styles.info}>{'Investigacion x'}</Text>

        {/* Correo */}
        <Text style={styles.info}>{institutional_email}</Text>
      </View>
      <NavigationButtons students={parsedStudents} index={parsedIndex} />
    </View>
  )
}
