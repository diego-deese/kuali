import React from 'react'
import { View } from 'react-native'
import colors from '../../../constants/colors'

import InputText from '../../shared/InputText/InputText'
import DatePickersSection from '../DatePickersSection/DatePickersSection'
import SelectInput from '../../shared/SelectInput'
import RequirementsSection from '../RequirementsSection/RequirementsSection'
import LoadingModal from '../../shared/LoadingModal/LoadingModal'
import ActivityOptionsSection from '../ActivityOptionsSection/ActivityOptionsSection'
import Button from '../../shared/Button/Button'

import { ImagePlusIcon } from '../../shared/Icons/Icons'

import { mapArrayToOptions } from '../../../utils/mappers'

import { ActivityErrors } from '../../../types/Error'
import { Option } from '../../shared/SelectInput/interfaces'
import { Location } from '../../../types/Location'

interface CreateActivityFormProps {
  loadingAction: boolean
  posterImg: {
    posterImg: string
    selectPosterImg?: () => void
  }
  title: {
    title: string
    onTitleChange: (title: string) => void
  }
  description: {
    description: string
    onDescriptionChange: (description: string) => void
  }
  location: {
    location: Option
    locations: Location[]
    onLocationChange: (newLocation: Option) => void
    updateLocationName: (location_id: number, newName: string) => Promise<void>
    deleteLocation: (location_id: number) => Promise<void>
    createLocation: (name: string) => Promise<Option | void>
  }
  errors: ActivityErrors
}

const CreateActivityForm: React.FC<CreateActivityFormProps> = ({
  location,
  loadingAction,
  posterImg,
  title,
  description,
  errors,
}) => {
  return (
    <View>
      <InputText
        label='Título de la actividad'
        placeholder='Mi Actividad'
        value={title.title}
        onChangeText={title.onTitleChange}
        error={errors.title.error}
        errorMessage={errors.title.errorMessage}
      />

      <DatePickersSection />

      <InputText
        label='Descripción de la actividad'
        placeholder='¿A quién le puede interesar? ¿Qué se hará?'
        multiline
        value={description.description}
        onChangeText={description.onDescriptionChange}
        error={errors.description.error}
        errorMessage={errors.description.errorMessage}
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
        error={errors.location.error}
        errorMessage={errors.location.errorMessage}
        onEditOption={location.updateLocationName}
        onDeleteOption={location.deleteLocation}
        onAddOption={location.createLocation}
        onSelect={location.onLocationChange}
        value={location.location}
      />

      <View style={{ marginBottom: 16 }}>
        <Button
          buttonText='Poster de la actividad'
          icon={<ImagePlusIcon color={colors.solidWhite} />}
          onPress={posterImg.selectPosterImg}
          error={errors.posterImage.error}
          errorLabel={errors.posterImage.errorMessage}
          showLabel={posterImg.posterImg !== null}
          label='Poster agregado'
        />
      </View>

      <ActivityOptionsSection />

      <RequirementsSection />

      <LoadingModal visible={loadingAction} />
    </View>
  )
}

export default CreateActivityForm
