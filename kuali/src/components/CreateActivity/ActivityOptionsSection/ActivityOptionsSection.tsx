import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SwitchComponent from '../../shared/Switch/Switch'
import colors from '../../../constants/colors'
import { useActivityFormContext } from '../../../context/ActivityFormContext/ActivityFormContext'

const ActivityOptionsSection = () => {
  const { activityOptions } = useActivityFormContext()

  return (
    <View style={styles.container}>
      <Text style={styles.switchsTitle}>Visible para:</Text>
      <View style={styles.switchsContainer}>
        <SwitchComponent
          label='Estudiantes'
          enabled={activityOptions?.visibleStudents}
          onChange={() =>
            activityOptions?.setVisibleStudents(
              !activityOptions.visibleStudents,
            )
          }
        />
        <SwitchComponent
          label='Investigadores'
          enabled={activityOptions?.visibleResearchers}
          onChange={() =>
            activityOptions?.setVisibleResearchers(
              !activityOptions.visibleResearchers,
            )
          }
        />
      </View>
      <View style={styles.registerContainer}>
        <View>
          <Text style={styles.switchsTitle}>Registro:</Text>
          <SwitchComponent
            label='Obligatorio'
            enabled={activityOptions?.mandatory}
            onChange={() =>
              activityOptions?.setMandatory(!activityOptions.mandatory)
            }
          />
        </View>
        <Text style={styles.description}>
          Habilitalo para inscribir automaticamente a todos los usuarios para
          los que esté disponible la actividad
        </Text>
      </View>
    </View>
  )
}

export default ActivityOptionsSection

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.solidWhite,
    borderColor: colors.borderGray,
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 16,
    padding: 16,
  },
  switchsContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomColor: colors.borderGray,
    borderBottomWidth: 1.5,
  },
  registerContainer: {
    flexDirection: 'row',
  },
  switchsTitle: {
    fontFamily: 'monserratBold',
    fontSize: 16,
    includeFontPadding: false,
    marginBottom: 8,
  },
  description: {
    width: 200,
    fontFamily: 'monserratItalic',
    fontSize: 12,
    color: colors.standardGray,
    textAlign: 'right',
    includeFontPadding: false,
  },
})
