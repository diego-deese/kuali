import React, { useState } from 'react'
import { Pressable, View, Text, ScrollView } from 'react-native'
import StudentReviewCard from '../../components/ReviewDoc/StudentReviewCard'
import styles from './reviewStudentDoc.styles'
import { router } from 'expo-router'
import { DownloadIcon } from '../../components/shared/Icons/Icons'
import { useLocalSearchParams } from 'expo-router'
import { useGroupedUserDocuments } from '../../hooks/ReviewDocs/useUserDocument'
import NavButtons from '../../components/shared/NavButtons/NavButtons'

export default function ReviewStudentDoc() {
  const { activity_id } = useLocalSearchParams()
  const activityId = Number(activity_id)
  const { documentsByRequirement, loading, refetch } = useGroupedUserDocuments(
    Number(activity_id),
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const handleDownload = () => {
    // Lógica para descargar
  }
  const group = documentsByRequirement[currentIndex]
  // Evitar errores si no hay documentos
  if (loading || !group || !group.requirement) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Cargando documentos o no hay datos disponibles.
        </Text>
      </View>
    )
  }
  const handleChange = () => {
    const firstUser = group?.userDocuments?.[0]?.user
    if (firstUser) {
      router.push({
        pathname: '/documents/doc/doc',
        params: {
          id: firstUser.user_id.toString(),
          activity_id: activityId.toString(),
        },
      })
    } else {
      alert('No se encontró un estudiante en este grupo.')
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Revisión de documentos</Text>
      <Pressable onPress={handleChange}>
        <Text style={styles.changeText}>Por documento {'>'}</Text>
      </Pressable>
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
          <DownloadIcon name='download' />
        </Pressable>
        <Pressable onPress={handleDownload}>
          <Text style={styles.dowload}> Descargar todos </Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {group.userDocuments?.map((doc, index) => {
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
        })}
      </ScrollView>
    </View>
  )
}
