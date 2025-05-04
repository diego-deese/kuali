import React from 'react'

import InputText from '../../shared/InputText/InputText'
import DatePickersSection from '../DatePickersSection/DatePickersSection'
import SelectInput from '../../shared/SelectInput/SelectInput'
import RequirementsSection from '../RequirementsSection/RequirementsSection'

const CreateActivityForm = ({ eventDate, limitDate, location }) => {
  return (
    <>
      <InputText label='Nombre del evento' placeholder='Evento' />

      <DatePickersSection eventDate={eventDate} limitDate={limitDate} />

      <SelectInput
        label='Lugar'
        options={location.locations}
        editable
        onEditOption={location.updateLocationName}
        onDeleteOption={location.deleteLocation}
      />

      <InputText
        label='Descripción del evento'
        placeholder='Evento'
        multiline
      />

      <RequirementsSection />
    </>
  )
}

export default CreateActivityForm
