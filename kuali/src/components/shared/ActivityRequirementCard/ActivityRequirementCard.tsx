import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../constants/colors'
import { DeleteIcon, DocumentIcon, EditIcon } from '../Icons/Icons'
import IconButton from '../IconButton/IconButton'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'
import NewRequirementModal from '../../CreateActivity/RequirementsSection/NewRequirementModal/NewRequirementModal'
import {
  ActivityRequirement,
  EditRequirement,
} from '../../../types/Requirements'

interface ActivityRequirementCardProps {
  requirementInfo: ActivityRequirement
  onDeletePress?: (requirementId: number) => void
  onEdit?: (requirementInfo: EditRequirement) => void
}

const ActivityRequirementCard: React.FC<ActivityRequirementCardProps> = ({
  requirementInfo,
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

  const onConfirmEdit = (requirementInfo: EditRequirement) => {
    setShowEditModal(false)
    onEdit(requirementInfo)
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{requirementInfo.name}</Text>
        <Text style={styles.description}>{requirementInfo.description}</Text>
      </View>
      <View
        style={[
          styles.iconsContainer,
          requirementInfo.description.length > 24 && {
            alignSelf: 'flex-start',
          },
        ]}
      >
        {requirementInfo.template !== null && (
          <DocumentIcon color={colors.standardGray} size={28} />
        )}
        <View
          style={[
            styles.actionIconsContainer,
            requirementInfo.template && styles.actionIconsContainerWithLimit,
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
        requirementInfo={requirementInfo}
        visible={showEditModal}
        onCancel={handleEditModalCancel}
        onConfirm={onConfirmEdit}
      />

      <ConfirmationModal
        title='Eliminar requisito'
        description='¿Estás seguro de que quieres eliminar este requisito de la actividad?'
        confirmButtonColor={colors.warningRed}
        visible={showConfirmationModal}
        onCancel={handleConfirmationModalCancel}
        onConfirm={() => onDeletePress(requirementInfo.requirement_id)}
        variant='delete'
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
    gap: 4,
  },
  name: {
    fontFamily: 'monserratBold',
    includeFontPadding: false,
    fontSize: 16,
  },
  description: {
    fontFamily: 'monserratRegular',
    includeFontPadding: false,
    fontSize: 14,
  },
})
