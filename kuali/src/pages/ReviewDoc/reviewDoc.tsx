import React from 'react'
import { Pressable, View, Text, ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { getStudents } from '../../context/StudentsStored'
import styles from './reviewDoc.Styles'
import Button from '../../components/shared/Button/Button'
import { router } from 'expo-router'
import { DownloadIcon } from '../../components/shared/Icons/Icons'
import DocReviewCard from '../../components/ReviewDoc/DocReviewcard/DocReviewCard'

export default function ReviewDoc() {
  const handleDownload = () => {
    console.log('Descargando...')
    // Aquí va tu lógica de descarga
  }
  const { index } = useLocalSearchParams()
  const parsedIndex = parseInt(index as string)
  const student = getStudents()[parsedIndex]

  return (
    <View style={styles.container}>
      <Button
        buttonText='Volver'
        onPress={() => router.push('/documents/student/studentsDoc')}
        style={{ width: '30%' }}
      />

      <Text style={styles.title}>Revisión de documentos</Text>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.changeText}>{'<'} Por alumno</Text>
      </Pressable>
      {/* Por el momento el documento sera un texto, despues se debe ligar con el id del documento */}
      <Text style={styles.docText}> Estudiante 1</Text>
      <View style={styles.row}>
        <Pressable onPress={handleDownload}>
          <DownloadIcon name='download' />
        </Pressable>
        <Pressable onPress={handleDownload}>
          <Text style={styles.dowload}> Descargar todos </Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {student.Requirements?.map((req, i) => (
          <DocReviewCard key={req.requirement_id} req={req} />
        ))}
      </ScrollView>
    </View>
  )
}
