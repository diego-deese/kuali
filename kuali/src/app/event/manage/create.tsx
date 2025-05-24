import React from 'react'
import CreateActivity from '../../../pages/CreateActivity/CreateActivity'
import { ActivityFormProvider } from '../../../context/ActivityFormContext/ActivityFormContext'

const CreateActivityPage = () => {
  return (
    <ActivityFormProvider mode='create'>
      <CreateActivity />
    </ActivityFormProvider>
  )
}

export default CreateActivityPage
