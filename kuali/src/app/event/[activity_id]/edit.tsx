import React from 'react'
import { ActivityFormProvider } from '../../../context/ActivityFormContext/ActivityFormContext'
import EditActivity from '../../../pages/EditActivity/EditActivity'
import { Redirect, useLocalSearchParams } from 'expo-router'
import Toast from 'react-native-toast-message'

const EditActivityPage = () => {
  const params = useLocalSearchParams()

  const activityId = params.activity_id

  if (activityId === undefined || isNaN(+activityId)) {
    Toast.show({
      type: 'error',
      text1: 'Hubo un error al obtener los datos de la actividad',
      text2: 'Intentalo de nuevo más tarde',
    })
    return <Redirect href='/' />
  }

  return (
    <ActivityFormProvider mode='edit' activityId={+activityId}>
      <EditActivity />
    </ActivityFormProvider>
  )
}

export default EditActivityPage
