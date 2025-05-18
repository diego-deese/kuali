import React from 'react'

import InputText from '../../shared/InputText/InputText'
import DatePickersSection from '../DatePickersSection/DatePickersSection'
import SelectInput from '../../shared/SelectInput'
import RequirementsSection from '../RequirementsSection/RequirementsSection'
import LoadingModal from '../../shared/LoadingModal/LoadingModal'

import { mapArrayToOptions } from '../../../utils/mappers'
import ActivityOptionsSection from '../ActivityOptionsSection/ActivityOptionsSection'
import { useCreateActivityContext } from '../../../context/CreateActivityContext/CreateActivityContext'
import { ScrollView, Text } from 'react-native'
import Button from '../../shared/Button/Button'
import { ImagePlusIcon } from '../../shared/Icons/Icons'
import colors from '../../../constants/colors'

const CreateActivityForm = () => {
  const { location, loadingAction, selectPosterImg } =
    useCreateActivityContext()

  return (
    <ScrollView nestedScrollEnabled>
      <InputText label='Nombre del evento' placeholder='Evento' />

      <DatePickersSection />

      <InputText
        label='Descripción del evento'
        placeholder='Evento'
        multiline
      />

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

      <Button
        style={{ marginBottom: 16 }}
        buttonText='Poster del evento'
        icon={<ImagePlusIcon color={colors.solidWhite} />}
        onPress={selectPosterImg}
      />

      <ActivityOptionsSection />

      <RequirementsSection />

      <LoadingModal visible={loadingAction} />
    </ScrollView>
  )
}

export default CreateActivityForm
