import React, { useRef, useState } from 'react'
import { Image, Modal, StyleSheet, Text, View } from 'react-native'
import colors from '../../../constants/colors'

import InputText from '../../shared/InputText/InputText'
import DatePickersSection from '../DatePickersSection/DatePickersSection'
import SelectInput from '../../shared/SelectInput'
import RequirementsSection from '../RequirementsSection/RequirementsSection'
import LoadingModal from '../../shared/LoadingModal/LoadingModal'
import ActivityOptionsSection from '../ActivityOptionsSection/ActivityOptionsSection'
import Button from '../../shared/Button/Button'

import { ImagePlusIcon, VisibilityIcon } from '../../shared/Icons/Icons'

import { mapArrayToOptions } from '../../../utils/mappers'

import { ActivityErrors } from '../../../types/Error'
import { Option } from '../../shared/SelectInput/interfaces'
import { Location } from '../../../types/Location'
import PosterModal from '../PosterModal/PosterModal'
import IconButton from '../../shared/IconButton/IconButton'
import activityService from '../../../services/activity.service'

interface CreateActivityFormProps {
  mode: 'create' | 'edit'
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
  mode = 'create',
  location,
  loadingAction,
  posterImg,
  title,
  description,
  errors,
}) => {
  const descriptionInputRef = useRef(null)

  const [showPoster, setShowPoster] = useState(false)

  const toggleShowPosterModal = () => {
    setShowPoster(!showPoster)
  }

  return (
    <View>
      <InputText
        label='Título de la actividad'
        placeholder='Mi Actividad'
        value={title.title}
        onChangeText={title.onTitleChange}
        error={errors.title.error}
        errorMessage={errors.title.errorMessage}
        onSubmitEditing={() => descriptionInputRef.current?.focus()}
      />

      <InputText
        label='Descripción de la actividad'
        placeholder='¿A quién le puede interesar? ¿Qué se hará?'
        multiline
        value={description.description}
        onChangeText={description.onDescriptionChange}
        error={errors.description.error}
        errorMessage={errors.description.errorMessage}
        inputRef={descriptionInputRef}
      />

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
        error={errors.location.error}
        errorMessage={errors.location.errorMessage}
        onEditOption={location.updateLocationName}
        onDeleteOption={location.deleteLocation}
        onAddOption={location.createLocation}
        onSelect={location.onLocationChange}
        value={location.location}
      />

      <View style={styles.posterButtonsContainer}>
        <View style={{ flex: 1 }}>
          <Button
            buttonText='Agregar poster'
            icon={<ImagePlusIcon color={colors.solidWhite} />}
            onPress={posterImg.selectPosterImg}
            error={errors.posterImage.error}
            errorLabel={errors.posterImage.errorMessage}
            showLabel={posterImg.posterImg !== null}
            label='Poster agregado'
          />
        </View>
        <IconButton
          icon={
            <VisibilityIcon
              color={colors.solidWhite}
              style={[styles.viewPosterButton]}
            />
          }
          onPress={toggleShowPosterModal}
          disabled={posterImg.posterImg === '' || posterImg.posterImg === null}
        />
      </View>

      <ActivityOptionsSection />

      <RequirementsSection mode={mode} />

      <PosterModal
        visible={showPoster}
        posterUri={posterImg.posterImg}
        onCloseModal={toggleShowPosterModal}
      />

      <LoadingModal visible={loadingAction} />
    </View>
  )
}

export default CreateActivityForm

const styles = StyleSheet.create({
  posterButtonsContainer: {
    flex: 1,
    marginBottom: 16,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    gap: 8,
  },
  viewPosterButton: {
    backgroundColor: colors.highlightCyan,
    padding: 8,
    borderRadius: 8,
  },
})
