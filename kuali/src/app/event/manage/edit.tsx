import React from 'react'
import { ActivityFormProvider } from '../../../context/ActivityFormContext/ActivityFormContext'
import EditActivity from '../../../pages/EditActivity/EditActivity'

const EditActivityPage = () => {
  return (
    <ActivityFormProvider mode='edit'>
      <EditActivity />
    </ActivityFormProvider>
  )
}

export default EditActivityPage
