import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../constants/colors'
import { DeleteIcon, DocumentIcon, EditIcon } from '../Icons/Icons'
import IconButton from '../IconButton/IconButton'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'
import NewRequirementModal from '../../CreateActivity/RequirementsSection/NewRequirementModal/NewRequirementModal'

interface ActivityRequirementCardProps {
  requirement_id: number
  name: string
  description: string
  hasAttachedFile?: boolean
  onDeletePress?: (requirementId: number) => void
  onEdit?: (requirementId: number, name: string, description: string) => void
}

const ActivityRequirementCard: React.FC<ActivityRequirementCardProps> = ({
  requirement_id,
  name,
  description,
  hasAttachedFile = false,
  onDeletePress,
  onEdit,
}) => {
  const [showConfirmationModal, setShowCofirmationModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const handleConfirmationModalCancel = () => {
    setShowCofirmationModal(false)
  }

  const handleEditModalCancel = () => {
    setShowEditModal(false)
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text>{description}</Text>
      </View>
      <View
        style={[
          styles.iconsContainer,
          description.length > 24 && { alignSelf: 'flex-start' },
        ]}
      >
        {hasAttachedFile && (
          <DocumentIcon color={colors.standardGray} size={28} />
        )}
        <View
          style={[
            styles.actionIconsContainer,
            hasAttachedFile && styles.actionIconsContainerWithLimit,
          ]}
        >
          <IconButton
            icon={<EditIcon color={colors.selectionBlue} size={28} />}
            onPress={() => setShowEditModal(true)}
          />
          <IconButton
            icon={<DeleteIcon color={colors.warningRed} size={32} />}
            onPress={() => setShowCofirmationModal(true)}
          />
        </View>
      </View>

      <NewRequirementModal
        requirementInfo={{ requirement_id, name, description }}
        visible={showEditModal}
        onCancel={handleEditModalCancel}
        onConfirm={(name: string, description: string) => {
          setShowEditModal(false)
          onEdit(requirement_id, name, description)
        }}
      />

      <ConfirmationModal
        title='Eliminar requisito'
        description='¿Estás seguro de que quieres eliminar este requisito del nuevo evento o convocatoria?'
        confirmButtonColor={colors.warningRed}
        visible={showConfirmationModal}
        onCancel={handleConfirmationModalCancel}
        onConfirm={() => onDeletePress(requirement_id)}
      />
    </View>
  )
}

export default ActivityRequirementCard

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.solidWhite,
    borderRadius: 16,
    marginBottom: 8,
  },
  iconsContainer: { flexDirection: 'row', gap: 4, alignItems: 'center' },
  actionIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
    marginStart: 8,
    paddingStart: 16,
  },
  actionIconsContainerWithLimit: {
    borderStartWidth: 1.5,
    borderColor: colors.inactiveGray,
  },
  textContainer: {
    width: '50%',
  },
  name: {
    fontFamily: 'monserratBold',
    fontSize: 16,
  },
})
