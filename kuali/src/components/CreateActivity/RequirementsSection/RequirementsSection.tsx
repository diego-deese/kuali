import { View, Text } from 'react-native'
import React, { useState } from 'react'
import IconButton from '../../shared/IconButton/IconButton'
import { PlusIcon } from '../../shared/Icons/Icons'
import { styles } from './styles'
import NewRequirementModal from './NewRequirementModal/NewRequirementModal'

interface Requirement {
  name: string
  description: string
}

const RequirementsSection = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <View style={styles.requirementsHeader}>
        <Text style={styles.subtitle}>Requisitos</Text>
        <IconButton
          icon={<PlusIcon size={20} />}
          onPress={() => setShowModal(true)}
        />
      </View>

      <NewRequirementModal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={() => setShowModal(false)}
      />
    </>
  )
}

export default RequirementsSection
