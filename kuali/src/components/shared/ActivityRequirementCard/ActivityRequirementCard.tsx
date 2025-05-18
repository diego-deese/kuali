import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../constants/colors'
import { DeleteIcon, DocumentIcon, EditIcon } from '../Icons/Icons'
import IconButton from '../IconButton/IconButton'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'
import NewRequirementModal from '../../CreateActivity/RequirementsSection/NewRequirementModal/NewRequirementModal'

interface ActivityRequirementCardProps {
  requirementId: number
  name: string
  description: string
  templateUri?: string
  onDeletePress?: (requirementId: number) => void
  onEdit?: (
    requirementId: number,
    name: string,
    description: string,
    templateUri: string,
  ) => void
}

const ActivityRequirementCard: React.FC<ActivityRequirementCardProps> = ({
  requirementId,
  name,
  description,
  templateUri,
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
        {templateUri && <DocumentIcon color={colors.standardGray} size={28} />}
        <View
          style={[
            styles.actionIconsContainer,
            templateUri && styles.actionIconsContainerWithLimit,
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
        requirementInfo={{
          requirement_id: requirementId,
          name,
          description,
          template_uri: templateUri,
        }}
        visible={showEditModal}
        onCancel={handleEditModalCancel}
        onConfirm={(name: string, description: string, templateUri: string) => {
          setShowEditModal(false)
          onEdit(requirementId, name, description, templateUri)
        }}
      />

      <ConfirmationModal
        title='Eliminar requisito'
        description='¿Estás seguro de que quieres eliminar este requisito del nuevo evento o convocatoria?'
        confirmButtonColor={colors.warningRed}
        visible={showConfirmationModal}
        onCancel={handleConfirmationModalCancel}
        onConfirm={() => onDeletePress(requirementId)}
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
