import { StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../constants/colors'

interface SwitchComponentProps {
  enabled: boolean
  onChange: () => void
}

const SwitchComponent: React.FC<SwitchComponentProps> = ({enabled = false, onChange}) => {
  return (
    <Switch 
      trackColor={{ false: '#1E1E1E', true: colors.highlightCyan }}
      thumbColor={ colors.borderGray }
      value={enabled}
      onValueChange={onChange}
    />
  )
}

export default SwitchComponent

const styles = StyleSheet.create({})