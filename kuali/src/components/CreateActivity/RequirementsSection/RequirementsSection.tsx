import { View, Text } from 'react-native'
import React from 'react'
import IconButton from '../../shared/IconButton/IconButton'
import { PlusIcon } from '../../shared/Icons/Icons'
import { styles } from './styles'

const RequirementsSection = () => {
  return (
    <>
      <View style={styles.requirementsHeader}>
        <Text style={styles.subtitle}>Requisitos</Text>
        <IconButton icon={<PlusIcon size={20} />} />
      </View>
    </>
  )
}

export default RequirementsSection
