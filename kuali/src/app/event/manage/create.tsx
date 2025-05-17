import React from 'react'
import CreateActivity from '../../../pages/CreateActivity/CreateActivity'
import { CreateActivityProvider } from '../../../context/CreateActivityContext/CreateActivityContext'

const CreateActivityPage = () => {
  return (
    <CreateActivityProvider>
      <CreateActivity />
    </CreateActivityProvider>
  )
}

export default CreateActivityPage
