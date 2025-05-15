import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import IconButton from '../../shared/IconButton/IconButton'
import { PlusIcon } from '../../shared/Icons/Icons'
import { styles } from './styles'
import NewRequirementModal from './NewRequirementModal/NewRequirementModal'
import { useCreateActivity } from '../../../context/CreateActivityContext/useCreateActivity'
import ActivityRequirementCard from '../../shared/ActivityRequirementCard/ActivityRequirementCard'

const RequirementsSection = () => {
  const [showModal, setShowModal] = useState(false)
  const { requirements } = useCreateActivity()

  return (
    <>
      <View style={styles.requirementsHeader}>
        <Text style={styles.subtitle}>Requisitos</Text>
        <IconButton
          icon={<PlusIcon size={20} />}
          onPress={() => setShowModal(true)}
        />
      </View>

      <FlatList
        keyExtractor={(item) => item.requirement_id.toString()}
        data={requirements.requirements}
        renderItem={({ item }) => (
          <ActivityRequirementCard
            requirement_id={item.requirement_id}
            name={item.name}
            description={item.description}
            hasAttachedFile
            onDeletePress={requirements.deleteRequirement}
            onEdit={requirements.editRequirement}
          />
        )}
      />

      <NewRequirementModal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={(name: string, description: string) => {
          setShowModal(false)
          requirements.addRequirement(name, description)
        }}
      />
    </>
  )
}

export default RequirementsSection
