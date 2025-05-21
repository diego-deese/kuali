import React, { useState } from 'react'
import { Pressable, View, Text, ScrollView } from 'react-native'
import { assignedStudents } from '../../components/DataExample/Students'
import { setStudents as setGlobalStudents } from '../../context/StudentsStored' // Renombrado para evitar conflicto
import StudentReviewCard from '../../components/ReviewDoc/StudentReviewCard/StudentReviewCard'
import styles from './reviewStudentDoc.styles'
import Button from '../../components/shared/Button/Button'
import { router } from 'expo-router'
import { DownloadIcon } from '../../components/shared/Icons/Icons'

export default function ReviewDoc() {
  const [students, setStudents] = useState(assignedStudents)

  const updateStatus = (index: number, status: 'approved' | 'rejected') => {
    const updated = [...students]
    //updated[index].documentStatus = status
    setStudents(updated)
  }

  const handleChange = () => {
    console.log('Cambio de vista a los documentos del primer estudiante')
    const firstStudent = students[0]

    setGlobalStudents(students) // Guardamos en memoria compartida

    router.push({
      pathname: '/documents/[id]',
      params: {
        id: firstStudent.user_id.toString(),
        index: '0',
      },
    })
  }
  const handleDownload = () => {
    //Logica para descargar
  }

  return (
    <View style={styles.container}>
      <Button
        buttonText='Volver'
        onPress={() => router.push('calendar')}
        style={{ width: '30%' }}
      />
      <Text style={styles.title}>Revisión de documentos</Text>
      <Pressable onPress={handleChange}>
        <Text style={styles.changeText}>Por documento {'>'}</Text>
      </Pressable>
      {/* Por el momento el documento sera un texto, despues se debe ligar con el id del documento */}
      <Text style={styles.docText}> Documento 1</Text>
      <View style={styles.row}>
        <Pressable onPress={handleDownload}>
          <DownloadIcon name='download' />
        </Pressable>
        <Pressable onPress={handleDownload}>
          <Text style={styles.dowload}> Descargar todos </Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {students.map((student, index) => (
          <StudentReviewCard
            key={student.user_id}
            student={{ ...student, index }}
            onApprove={() => updateStatus(index, 'approved')}
            onReject={() => updateStatus(index, 'rejected')}
          />
        ))}
      </ScrollView>
    </View>
  )
}
