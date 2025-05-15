import React from 'react'

import InputText from '../../shared/InputText/InputText'
import DatePickersSection from '../DatePickersSection/DatePickersSection'
import SelectInput from '../../shared/SelectInput'
import RequirementsSection from '../RequirementsSection/RequirementsSection'
import LoadingModal from '../../shared/LoadingModal/LoadingModal'

import { mapArrayToOptions } from '../../../utils/mappers'
import { useCreateActivity } from '../../../context/CreateActivityContext/useCreateActivity'

const CreateActivityForm = () => {
  const { location, loadingAction } = useCreateActivity()

  return (
    <>
      <InputText label='Nombre del evento' placeholder='Evento' />

      <DatePickersSection />

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
        onSelect={location.onLocationChange}
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
