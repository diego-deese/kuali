import { useLocations } from '../../hooks/CreateActivity/useLocations'
import { useDates } from '../../hooks/CreateActivity/useDates'
import { useRequirements } from '../../hooks/CreateActivity/useRequirements'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import activityService from '../../services/activity.service'
import { NewActivityData } from '../../types/Activity'
import { ActivityErrors, InputError } from '../../types/Error'
import { Option } from '../../components/shared/SelectInput/interfaces'
import Toast from 'react-native-toast-message'

export const useCreateActivity = () => {
  const locationManagement = useLocations()
  const dateManagement = useDates()
  const requirementsManagement = useRequirements()

  const [visibleStudents, setVisibleStudents] = useState(true)
  const [visibleResearchers, setVisibleResearchers] = useState(true)
  const [mandatory, setMandatory] = useState(false)

  const [loading, setLoading] = useState(false)
  const [loadingAction, setLoadingAction] = useState(false)

  const [posterImg, setPosterImg] = useState<string | null>(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [errors, setErrors] = useState<ActivityErrors>({
    title: {
      error: false,
      errorMessage: '',
    },
    description: {
      error: false,
      errorMessage: '',
    },
    location: {
      error: false,
      errorMessage: '',
    },
    posterImage: {
      error: false,
      errorMessage: '',
    },
  })

  const validateTitle = (title: string) => {
    if (title === '' || !title) {
      return {
        error: true,
        errorMessage: 'El título del evento es requerido',
      }
    }

    const letterRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/
    if (!letterRegex.test(title)) {
      return {
        error: true,
        errorMessage: 'Solo se permiten letras y números',
      }
    }

    return {
      error: false,
      errorMessage: '',
    }
  }

  const validateDescription = (description: string) => {
    if (description === '' || !description) {
      return {
        error: true,
        errorMessage: 'La descripción del evento es requerida',
      }
    }

    return {
      error: false,
      errorMessage: '',
    }
  }

  const validatePosterImage = (posterImgUri: string): InputError => {
    if (posterImgUri === null) {
      return {
        error: true,
        errorMessage: 'El poster del evento es requerido',
      }
    }

    return {
      error: false,
      errorMessage: '',
    }
  }

  const validateLocation = (location: Option | null): InputError => {
    if (location === null) {
      return {
        error: true,
        errorMessage: 'La ubicación del evento es requerida',
      }
    }

    return {
      error: false,
      errorMessage: '',
    }
  }

  const validateAllFields = (): boolean => {
    const newErrors: ActivityErrors = {
      title: validateTitle(title),
      description: validateDescription(description),
      posterImage: validatePosterImage(posterImg),
      location: validateLocation(locationManagement.location),
    }

    setErrors(newErrors)

    return !(
      newErrors.title.error ||
      newErrors.description.error ||
      newErrors.location.error ||
      newErrors.posterImage.error
    )
  }

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
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        title: validateTitle(title),
      }
    })
  }

  const onDescriptionChange = (description: string) => {
    setDescription(description)
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        description: validateDescription(description),
      }
    })
  }

  const onLocationChange = (newLocation: Option) => {
    locationManagement.onLocationChange(newLocation)
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        location: validateLocation(newLocation),
      }
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
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          posterImage: validatePosterImage(uri),
        }
      })
    } else {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          posterImage: validatePosterImage(null),
        }
      })
    }
  }

  const createActivity = async () => {
    setLoadingAction(true)
    try {
      const allFieldsCorrect = validateAllFields()

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
    errors,
    createActivity,
    setLoading,
    setLoadingAction,
  }
}
