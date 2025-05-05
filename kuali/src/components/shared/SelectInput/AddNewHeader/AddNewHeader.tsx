import React from 'react'
import { View, Text } from 'react-native'

import IconButton from '../../IconButton/IconButton'
import colors from '../../../../constants/colors'
import { styles } from './styles'

import { PlusBoxIcon } from '../../Icons/Icons'

const AddNewHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Añadir nuevo...</Text>
      <IconButton
        icon={<PlusBoxIcon color={colors.selectionBlue} size={28} />}
      />
    </View>
  )
}

export default AddNewHeader
