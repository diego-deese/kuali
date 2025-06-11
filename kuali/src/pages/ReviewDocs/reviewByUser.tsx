import React, { useState, useEffect } from 'react'
import {
  Pressable,
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import styles from './styles'
import { router } from 'expo-router'
import { DownloadIcon } from '../../components/shared/Icons/Icons'
import DocReviewCard from '../../components/ReviewDoc/DocReviewCard'
import { useGroupedUserDocuments } from '../../hooks/ReviewDocs/useReviewDoc'
import NavButtons from '../../components/shared/NavButtons/NavButtons'
import SelectInput from '../../components/shared/SelectInput'
import colors from '../../constants/colors'
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
  const {
    documentsByUser,
    loading,
    refreshing,
    handleRefresh,
    refetch,
    downloadAllDocumentsByUser,
  } = useGroupedUserDocuments(actId, 'user')
  // Track the currently selected user index for navigation
  const [currentIndex, setCurrentIndex] = useState(0)
  // SelectInput logic
  const viewOptions = [
    { id: 1, label: 'Por usuario' },
    { id: 2, label: 'Por documento' },
  ]
  const [selectedView, setSelectedView] = useState(viewOptions[0])
  useEffect(() => {
    if (selectedView.id === 2) {
      router.replace({
        pathname: '/review/student/student',
        params: { activity_id: activity_id.toString() },
      })
    }
  }, [selectedView])
  // Display loading message if data is being fetched
  if (loading) {
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
    downloadAllDocumentsByUser(student.user.user_id)
    // Lógica de descarga (pendiente)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Revisión de documentos</Text>
      {/* Selector de vista */}
      <SelectInput
        label='¿Cómo desea aprobar las inscripciones?'
        value={selectedView}
        options={viewOptions}
        onSelect={setSelectedView}
      />
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
        Usuario:{' '}
        {student?.user
          ? `${student.user.name} ${student.user.second_name} ${student.user.paternal_lastname}`
          : 'Sin usuarios'}
      </Text>
      {/* Download all documents section (icon + text button) */}
      <TouchableOpacity onPress={handleDownload} style={styles.row}>
        <DownloadIcon name='download' color='#2C4A90' />
        <Text style={styles.dowload}> Descargar todos </Text>
      </TouchableOpacity>

      {/* List of document cards for the selected student */}
      <ScrollView
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.selectionBlue}
            colors={[colors.selectionBlue]}
          />
        }
      >
        {student?.userDocuments?.length ? (
          student.userDocuments.map((req) => (
            <DocReviewCard
              key={req.user_document_id}
              req={req}
              onActionComplete={refetch}
            />
          ))
        ) : (
          <Text style={styles.noUser}>Aún no hay archivos para revisar</Text>
        )}
      </ScrollView>
    </View>
  )
}
