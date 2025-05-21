import React from 'react'

import InputText from '../../shared/InputText/InputText'
import DatePickersSection from '../DatePickersSection/DatePickersSection'
import SelectInput from '../../shared/SelectInput'
import RequirementsSection from '../RequirementsSection/RequirementsSection'
import LoadingModal from '../../shared/LoadingModal/LoadingModal'

import { mapArrayToOptions } from '../../../utils/mappers'
import ActivityOptionsSection from '../ActivityOptionsSection/ActivityOptionsSection'
import { useCreateActivityContext } from '../../../context/CreateActivityContext/CreateActivityContext'
import { ScrollView, View } from 'react-native'
import Button from '../../shared/Button/Button'
import { ImagePlusIcon } from '../../shared/Icons/Icons'
import colors from '../../../constants/colors'

const CreateActivityForm = () => {
  const { location, loadingAction, posterImg, title, description, errors } =
    useCreateActivityContext()

  return (
    <ScrollView nestedScrollEnabled>
      <InputText
        label='Título del evento'
        placeholder='Evento'
        value={title.title}
        onChangeText={title.onTitleChange}
        error={errors.title.error}
        errorMessage={errors.title.errorMessage}
      />

      <DatePickersSection />

      <InputText
        label='Descripción del evento'
        placeholder='Evento'
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
      />

      <View style={{ marginBottom: 16 }}>
        <Button
          buttonText='Poster del evento'
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
    </ScrollView>
  )
}

export default CreateActivityForm
