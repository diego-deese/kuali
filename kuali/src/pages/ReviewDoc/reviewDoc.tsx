import React, { useState } from 'react'
import { Pressable, View, Text, ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import styles from './reviewDoc.Styles'
import { router } from 'expo-router'
import { DownloadIcon } from '../../components/shared/Icons/Icons'
import DocReviewCard from '../../components/ReviewDoc/DocReviewCard'
import { useGroupedUserDocuments } from '../../hooks/ReviewDocs/useReviewDoc'
import NavButtons from '../../components/shared/NavButtons/NavButtons'

export default function ReviewDoc() {
  const { activity_id } = useLocalSearchParams()
  const actId = Number(activity_id)
  //console.log('Activity ID:', actId)
  const { documentsByUser, loading, refetch } = useGroupedUserDocuments(
    actId,
    'user',
  )
  //console.log('documentsByUser', documentsByUser)
  const [currentIndex, setCurrentIndex] = useState(0)
  if (loading || documentsByUser.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando documentos del estudiante...</Text>
      </View>
    )
  }
  const student = documentsByUser[currentIndex]
  const handleDownload = () => {
    console.log(`Descargando documentos de ${student.user.name}`)
    // Lógica de descarga (pendiente)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Revisión de documentos</Text>
      <Pressable
        onPress={() =>
          router.push({
            pathname: '/review/student/student',
            params: { activity_id: activity_id.toString() },
          })
        }
      >
        <Text style={styles.changeText}>{'<'} Por usuario</Text>
      </Pressable>
      <NavButtons
        currentIndex={currentIndex}
        total={documentsByUser.length}
        onPrev={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
        onNext={() =>
          setCurrentIndex((i) => Math.min(i + 1, documentsByUser.length - 1))
        }
        label='Usuario'
      />
      <Text style={styles.docText}>
        Usuario:
        {`${student.user.name} ${student.user.second_name} ${student.user.paternal_lastname}`}
      </Text>
      <View style={styles.row}>
        <Pressable onPress={handleDownload}>
          <DownloadIcon name='download' />
        </Pressable>
        <Pressable onPress={handleDownload}>
          <Text style={styles.dowload}> Descargar todos </Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {student.userDocuments.map((req) => (
          <DocReviewCard
            key={req.user_document_id}
            req={req}
            onActionComplete={refetch}
          />
        ))}
      </ScrollView>
    </View>
  )
}
