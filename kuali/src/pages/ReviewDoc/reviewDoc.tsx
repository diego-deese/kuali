import React, { useState } from 'react'
import { Pressable, View, Text, ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import styles from './reviewDoc.Styles'
import { router } from 'expo-router'
import { DownloadIcon } from '../../components/shared/Icons/Icons'
import DocReviewCard from '../../components/ReviewDoc/DocReviewCard'
import { useGroupedUserDocuments } from '../../hooks/ReviewDocs/useReviewDoc'
import NavButtons from '../../components/shared/NavButtons/NavButtons'
/**
 * ReviewDoc screen allows reviewing all documents submitted by users
 * (grouped by user) for a specific activity. Users can navigate between
 * different students and review each of their documents individually.
 */
export default function ReviewDoc() {
  // Get the activity ID from route parameters
  const { activity_id } = useLocalSearchParams()
  const actId = Number(activity_id)
  // Fetch user documents grouped by user, along with loading and refetch status
  const { documentsByUser, loading, refetch } = useGroupedUserDocuments(
    actId,
    'user',
  )
  // Track the currently selected user index for navigation
  const [currentIndex, setCurrentIndex] = useState(0)
  // Display loading message if data is being fetched or no documents are available
  if (loading || documentsByUser.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando documentos del estudiante...</Text>
      </View>
    )
  }
  // Get the currently selected student and their documents
  const student = documentsByUser[currentIndex]
  // Handler for downloading all documents of a student (not yet implemented)
  const handleDownload = () => {
    console.log(`Descargando documentos de ${student.user.name}`)
    // Lógica de descarga (pendiente)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Revisión de documentos</Text>
      {/* Link to switch to user-based review view */}
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
      {/* Navigation buttons to switch between students */}
      <NavButtons
        currentIndex={currentIndex}
        total={documentsByUser.length}
        onPrev={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
        onNext={() =>
          setCurrentIndex((i) => Math.min(i + 1, documentsByUser.length - 1))
        }
        label='Usuario'
      />
      {/* Display current user's full name */}
      <Text style={styles.docText}>
        Usuario: {''}
        {`${student.user.name} ${student.user.second_name} ${student.user.paternal_lastname}`}
      </Text>
      {/* Download all documents section (icon + text button) */}
      <View style={styles.row}>
        <Pressable onPress={handleDownload}>
          <DownloadIcon name='download' />
        </Pressable>
        <Pressable onPress={handleDownload}>
          <Text style={styles.dowload}> Descargar todos </Text>
        </Pressable>
      </View>
      {/* List of document cards for the selected student */}
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
