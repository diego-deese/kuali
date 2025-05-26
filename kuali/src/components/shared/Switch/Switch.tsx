import { StyleSheet, Switch, Text, View } from 'react-native'
import React from 'react'
import colors from '../../../constants/colors'

interface SwitchComponentProps {
  enabled?: boolean
  label?: string
  onChange: () => void
}

const SwitchComponent: React.FC<SwitchComponentProps> = ({
  enabled = false,
  label,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Switch
        trackColor={{ false: '#1E1E1E', true: colors.highlightCyan }}
        thumbColor={colors.borderGray}
        value={enabled}
        onValueChange={onChange}
      />
    </View>
  )
}

export default SwitchComponent

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontFamily: 'monserratRegular',
    fontSize: 16,
    includeFontPadding: false,
  },
})
