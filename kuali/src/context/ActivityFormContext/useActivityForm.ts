import { useLocations } from '../../hooks/ActivityForm/useLocations'
import { useDates } from '../../hooks/ActivityForm/useDates'
import { useRequirements } from '../../hooks/ActivityForm/useRequirements'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import activityService from '../../services/activity.service'
import { NewActivityData } from '../../types/Activity'
import { Option } from '../../components/shared/SelectInput/interfaces'
import Toast from 'react-native-toast-message'
import { useErrors } from '../../hooks/ActivityForm/useErrors'

export const useActivityForm = (
  mode: 'create' | 'edit',
  activityId?: number,
) => {
  const locationManagement = useLocations()
  const dateManagement = useDates()
  const requirementsManagement = useRequirements()
  const errorManagement = useErrors()

  const [visibleStudents, setVisibleStudents] = useState(true)
  const [visibleResearchers, setVisibleResearchers] = useState(true)
  const [mandatory, setMandatory] = useState(false)

  const [loading, setLoading] = useState(false)
  const [loadingAction, setLoadingAction] = useState(false)

  const [posterImg, setPosterImg] = useState<string | null>(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const restartFields = (): void => {
    setTitle('')
    setDescription('')
    setPosterImg(null)
    setVisibleStudents(true)
    setVisibleResearchers(true)
    setMandatory(false)
  }

  const onTitleChange = (title: string) => {
    setTitle(title)
    errorManagement.updateErrors({
      title: errorManagement.validateTitle(title),
    })
  }

  const onDescriptionChange = (description: string) => {
    setDescription(description)
    errorManagement.updateErrors({
      description: errorManagement.validateDescription(description),
    })
  }

  const onLocationChange = (newLocation: Option) => {
    locationManagement.onLocationChange(newLocation)
    errorManagement.updateErrors({
      location: errorManagement.validateLocation(newLocation),
    })
  }

  const selectPosterImg = async () => {
    setPosterImg(null)

    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [9, 16],
      quality: 0.7,
    }

    const result = await ImagePicker.launchImageLibraryAsync(options)

    if (!result.canceled) {
      const uri = result.assets[0].uri
      setPosterImg(uri)
      errorManagement.updateErrors({
        posterImage: errorManagement.validatePosterImage(uri),
      })
    } else {
      errorManagement.updateErrors({
        posterImage: errorManagement.validatePosterImage(null),
      })
    }
  }

  const createActivity = async () => {
    setLoadingAction(true)
    try {
      const allFieldsCorrect = errorManagement.validateAllFields(
        title,
        description,
        posterImg,
        locationManagement.location,
      )

      if (allFieldsCorrect) {
        const activityData: NewActivityData = {
          title: title,
          description: description,
          visible_students: visibleStudents,
          visible_researchers: visibleResearchers,
          mandatory,
          location_id: locationManagement.location.id,
          event_date: dateManagement.activityDate as Date,
          register_date_limit: dateManagement.limitDate as Date,
          poster_image_uri: posterImg,
          // If the activity has requirements then we pass them
          ...(requirementsManagement.requirements.length > 0
            ? { requirements: requirementsManagement.requirements }
            : {}),
        }

        const result = await activityService.createActivity(activityData)

        if (!result.success && 'error' in result) {
          Toast.show({
            type: 'error',
            text1: result.message,
            text2: result.error,
          })
        } else {
          Toast.show({
            text1: 'Nueva actividad creada',
            text2: 'Ahora se puede visualizar la actividad en el calendario',
          })
          restartFields()
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error al crear la nueva actividad',
          text2: 'Corrige los errores e intentalo de nuevo',
        })
      }
    } catch (error) {
      console.error(error)
      Toast.show({
        type: 'error',
        text1: 'Error al crear la nueva actividad',
        text2: 'Por favor intenta de nuevo más tarde',
      })
    } finally {
      setLoadingAction(false)
    }
  }

  return {
    mode,
    activityId,
    dates: {
      activityDate: dateManagement.activityDate,
      onActivityDateChange: dateManagement.onActivityDateChange,
      limitDate: dateManagement.limitDate,
      onLimitDateChange: dateManagement.onLimitDateChange,
    },
    location: {
      location: locationManagement.location,
      locations: locationManagement.locations,
      onLocationChange: onLocationChange,
      updateLocationName: locationManagement.updateLocationName,
      deleteLocation: locationManagement.deleteLocation,
      createLocation: locationManagement.createLocation,
    },
    requirements: {
      requirements: requirementsManagement.requirements,
      addRequirement: requirementsManagement.addRequirement,
      deleteRequirement: requirementsManagement.deleteRequirement,
      editRequirement: requirementsManagement.editRequirement,
    },
    activityOptions: {
      visibleStudents,
      visibleResearchers,
      mandatory,
      setVisibleStudents,
      setVisibleResearchers,
      setMandatory,
    },
    posterImg: {
      posterImg,
      selectPosterImg,
    },
    title: {
      title,
      onTitleChange,
    },
    description: {
      description,
      onDescriptionChange,
    },
    loading,
    loadingAction,
    errors: errorManagement.errors,
    createActivity,
    setLoading,
    setLoadingAction,
  }
}
