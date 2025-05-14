import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import IconButton from '../../shared/IconButton/IconButton'
import { PlusIcon } from '../../shared/Icons/Icons'
import NewAttachedFileModal from './NewAttachedFileModal/NewAttachedFileModal'

interface ActivityAttachedFile {
  activity_attached_file_id: number
  name: string
  activity_id: number
}

const AttachedFilesSection = () => {
  const [attachedFiles, setAttachedFiles] = useState<ActivityAttachedFile[]>([])
  const [showModal, setShowModal] = useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.requirementsHeader}>
        <Text style={styles.subtitle}>Archivos adjuntos</Text>
        <IconButton
          icon={<PlusIcon size={20} />}
          onPress={() => setShowModal(true)}
        />
      </View>
      <NewAttachedFileModal
        visible={showModal}
        onConfirm={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
      />
    </View>
  )
}

export default AttachedFilesSection

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  requirementsHeader: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  subtitle: {
    fontFamily: 'monserratBold',
    fontSize: 16,
  },
})
