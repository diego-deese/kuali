import React from 'react'
import { Pressable, View, Text, ScrollView } from 'react-native'
import StudentReviewCard from '../../components/ReviewDoc/StudentReviewCard/StudentReviewCard'
import styles from './reviewStudentDoc.styles'
import Button from '../../components/shared/Button/Button'
import { router } from 'expo-router'
import { DownloadIcon } from '../../components/shared/Icons/Icons'
import { useLocalSearchParams } from 'expo-router'
import { useGroupedUserDocuments } from '../../hooks/ReviewDocs/useUserDocument'

export default function ReviewStudentDoc() {
  const { activity_id } = useLocalSearchParams()
  const { documentsByRequirement, loading } = useGroupedUserDocuments(
    Number(activity_id),
  )

  const updateStatus = (index: number, status: 'approved' | 'rejected') => {
    console.log(`Actualizar documento en índice ${index} a estado: ${status}`)
    // Aquí iría la lógica para actualizar el estado en la base de datos
  }

  const handleChange = () => {
    // Lógica para cambiar de vista
  }

  const handleDownload = () => {
    // Lógica para descargar
  }

  return (
    <View style={styles.container}>
      <Button
        buttonText='Volver'
        onPress={() =>
          router.push({
            pathname: '/event/[activity_id]',
            params: { activity_id: activity_id.toString() },
          })
        }
        style={{ width: '30%' }}
      />
      <Text style={styles.title}>Revisión de documentos</Text>
      <Pressable onPress={handleChange}>
        <Text style={styles.changeText}>Por documento {'>'}</Text>
      </Pressable>
      <ScrollView contentContainerStyle={styles.list}>
        {!loading &&
          documentsByRequirement.map((group, groupIndex) => (
            <View key={groupIndex}>
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
              {group.userDocuments?.map((doc, index) => {
                const user = doc.user
                if (!user) return null

                return (
                  <StudentReviewCard
                    key={doc.user_document_id}
                    student={{
                      user_id: user.user_id,
                      name: user.name,
                      second_name: user.second_name,
                      paternal_lastname: user.paternal_lastname,
                      documentStatus: doc.status?.name || null,
                      index,
                    }}
                    onApprove={() => updateStatus(index, 'approved')}
                    onReject={() => updateStatus(index, 'rejected')}
                  />
                )
              })}
            </View>
          ))}
      </ScrollView>
    </View>
  )
}
