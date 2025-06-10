import React, { useState, useEffect } from 'react'
import { Pressable, View, Text, ScrollView, RefreshControl } from 'react-native'
import StudentReviewCard from '../../components/ReviewDoc/StudentReviewCard'
import styles from './styles'
import { router } from 'expo-router'
import { DownloadIcon } from '../../components/shared/Icons/Icons'
import { useLocalSearchParams } from 'expo-router'
import { useGroupedUserDocuments } from '../../hooks/ReviewDocs/useUserDocument'
import NavButtons from '../../components/shared/NavButtons/NavButtons'
import SelectInput from '../../components/shared/SelectInput'
import colors from '../../constants/colors'

/**
 * ReviewStudentDoc displays documents grouped by required document type.
 * Allows reviewing which students submitted each required document for a given activity.
 */
export default function ReviewStudentDoc() {
  // Retrieve activity ID from the URL parameters
  const { activity_id } = useLocalSearchParams()
  const activityId = Number(activity_id)
  // Fetch documents grouped by requirement (per document type)
  const {
    documentsByRequirement,
    loading,
    refreshing,
    handleRefresh,
    refetch,
  } = useGroupedUserDocuments(activityId)
  // Track the currently selected requirement index for navigation
  const [currentIndex, setCurrentIndex] = useState(0)
  const viewOptions = [
    { id: 1, label: 'Por documento' },
    { id: 2, label: 'Por usuario' },
  ]
  const [selectedView, setSelectedView] = useState(viewOptions[0])
  useEffect(() => {
    if (selectedView.id === 2) {
      router.replace({
        pathname: '/review/doc/doc',
        params: {
          activity_id: activityId.toString(),
        },
      })
    }
  }, [selectedView])
  // Placeholder for a download handler (e.g., download all documents for this requirement)
  const handleDownload = () => {}
  // Get the currently selected requirement group
  const group = documentsByRequirement[currentIndex]
  // Display loading screen or fallback if group data is unavailable
  if (loading || !group || !group.requirement) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Cargando documentos </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Revisión de documentos</Text>
      <SelectInput
        label='¿Cómo desea aprobar las inscripciones?'
        value={selectedView}
        options={viewOptions}
        onSelect={setSelectedView}
      />
      {/* Navigation buttons to switch between document requirements */}
      <NavButtons
        currentIndex={currentIndex}
        total={documentsByRequirement.length}
        onPrev={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
        onNext={() =>
          setCurrentIndex((i) =>
            Math.min(i + 1, documentsByRequirement.length - 1),
          )
        }
        label='Documento'
      />
      <Text style={styles.docText}>
        Documento requerido: {group.requirement.name}
      </Text>
      <View style={styles.row}>
        <Pressable onPress={handleDownload}>
          <DownloadIcon name='download' color='#2C4A90' />
        </Pressable>
        <Pressable onPress={handleDownload}>
          <Text style={styles.dowload}> Descargar todos </Text>
        </Pressable>
      </View>
      {/* Scrollable list of student review cards for this document requirement */}
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
        {group.userDocuments?.length ? (
          group.userDocuments.map((doc, index) => {
            const user = doc.user
            if (!user) return null

            return (
              <StudentReviewCard
                key={doc.user_document_id}
                student={{
                  user_document_id: doc.user_document_id,
                  name: user.name,
                  second_name: user.second_name,
                  paternal_lastname: user.paternal_lastname,
                  documentStatus: { name: doc.status?.name || null },
                  index,
                }}
                onActionComplete={refetch}
              />
            )
          })
        ) : (
          <Text style={styles.noUser}>Aún no hay archivos para revisar</Text>
        )}
      </ScrollView>
    </View>
  )
}
