import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import IconButton from '../../IconButton/IconButton'
import { PlusBoxIcon } from '../../Icons/Icons'
import colors from '../../../../constants/colors'

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 2,
    borderColor: colors.borderGray,
  },
  title: {
    fontFamily: 'monserratRegular',
    fontSize: 16,
    includeFontPadding: false,
  },
})
