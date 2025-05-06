import React, { useEffect } from 'react'

import InputText from '../../shared/InputText/InputText'
import DatePickersSection from '../DatePickersSection/DatePickersSection'
import SelectInput from '../../shared/SelectInput'
import RequirementsSection from '../RequirementsSection/RequirementsSection'
import LoadingModal from '../../shared/LoadingModal/LoadingModal'

import { useCreateActivity } from '../../../hooks/CreateActivity/useCreateActivity'

import { mapArrayToOptions } from '../../../utils/mappers'

const CreateActivityForm = () => {
  const { eventDate, limitDate, location, loadingAction } = useCreateActivity()

  return (
    <>
      <InputText label='Nombre del evento' placeholder='Evento' />

      <DatePickersSection eventDate={eventDate} limitDate={limitDate} />

      <SelectInput
        label='Lugar'
        options={
          location.locations
            ? mapArrayToOptions(location.locations, 'location_id', 'name')
            : []
        }
        headerInputPlaceholder='Nuevo lugar'
        editable
        onEditOption={location.updateLocationName}
        onDeleteOption={location.deleteLocation}
        onAddOption={location.createLocation}
        onSelect={location.setLocation}
      />

      <InputText
        label='Descripción del evento'
        placeholder='Evento'
        multiline
      />

      <RequirementsSection />

      <LoadingModal visible={loadingAction} />
    </>
  )
}

export default CreateActivityForm
