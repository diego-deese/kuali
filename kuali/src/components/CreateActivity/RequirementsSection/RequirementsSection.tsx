import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import IconButton from '../../shared/IconButton/IconButton'
import { PlusIcon } from '../../shared/Icons/Icons'
import { styles } from './styles'
import NewRequirementModal from './NewRequirementModal/NewRequirementModal'
import ActivityRequirementCard from '../../shared/ActivityRequirementCard/ActivityRequirementCard'
import { useCreateActivityContext } from '../../../context/CreateActivityContext/CreateActivityContext'

const RequirementsSection = () => {
  const [showModal, setShowModal] = useState(false)
  const { requirements } = useCreateActivityContext()

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
            requirementId={item.requirement_id}
            name={item.name}
            description={item.description}
            templateUri={item.template_uri}
            onDeletePress={requirements.deleteRequirement}
            onEdit={requirements.editRequirement}
          />
        )}
      />

      <NewRequirementModal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={(
          name: string,
          description: string,
          template_uri?: string,
        ) => {
          setShowModal(false)
          requirements.addRequirement(name, description, template_uri)
        }}
      />
    </>
  )
}

export default RequirementsSection
