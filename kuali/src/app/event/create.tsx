import React from 'react'
import { ActivityFormProvider } from '../../context/ActivityFormContext/ActivityFormContext'
import CreateActivity from '../../pages/CreateActivity/CreateActivity'

const CreateActivityPage = () => {
  return (
    <ActivityFormProvider mode='create'>
      <CreateActivity />
    </ActivityFormProvider>
  )
}

export default CreateActivityPage
