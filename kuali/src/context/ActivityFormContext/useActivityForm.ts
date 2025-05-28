import { useLocations } from '../../hooks/ActivityForm/useLocations'
import { useDates } from '../../hooks/ActivityForm/useDates'
import { useRequirements } from '../../hooks/ActivityForm/useRequirements'
import { useEffect, useRef, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import activityService from '../../services/activity.service'
import { NewActivityData, UpdateActivityData } from '../../types/Activity'
import { Option } from '../../components/shared/SelectInput/interfaces'
import Toast from 'react-native-toast-message'
import { useErrors } from '../../hooks/ActivityForm/useErrors'
import { mapToOption } from '../../utils/mappers'
import { ActivityRequirement } from '../../types/Requirements'

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

  const editedActivityDataRef = useRef<UpdateActivityData>({ activity_id: 0 })

  const loadActivityData = async (activityId: number): Promise<void> => {
    setLoading(true)
    try {
      const result = await activityService.getActivityById(activityId)

      if (!result.success && 'error' in result) {
        Toast.show({
          type: 'error',
          text1: result.message,
          text2: result.error,
        })
        return
      }

      const activity = result.data

      // Populate activity form fields
      setTitle(activity.title)
      setDescription(activity.description)
      setVisibleStudents(activity?.visible_students)
      setVisibleResearchers(activity?.visible_researchers)
      setMandatory(activity?.mandatory)
      locationManagement.onLocationChange(
        mapToOption(activity.location, 'id_location', 'name'),
      )
      requirementsManagement.setInitialRequirements(
        activity.requirements.map<ActivityRequirement>((req) => {
          return {
            requirement_id: req.requirement_id,
            name: req.name,
            description: req.description,
            template:
              req.template !== null
                ? {
                    ...req.template,
                    template_uri:
                      req.template.requirement_template_id.toString(),
                  }
                : null,
          }
        }),
      )
      dateManagement.onActivityDateChange(new Date(activity.event_date))
      dateManagement.onLimitDateChange(new Date(activity.register_date_limit))

      editedActivityDataRef.current.activity_id = activity.activity_id
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (mode === 'edit' && activityId) {
      loadActivityData(activityId)
    }
  }, [mode, activityId])

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
    if (mode === 'edit') {
      editedActivityDataRef.current.title = title
    }
    errorManagement.updateErrors({
      title: errorManagement.validateTitle(title),
    })
  }

  const onDescriptionChange = (description: string) => {
    setDescription(description)
    if (mode === 'edit') {
      editedActivityDataRef.current.description = description
    }
    errorManagement.updateErrors({
      description: errorManagement.validateDescription(description),
    })
  }

  const onLocationChange = (newLocation: Option) => {
    locationManagement.onLocationChange(newLocation)
    if (mode === 'edit') {
      editedActivityDataRef.current.location_id = newLocation.id
    }
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
      if (mode === 'edit') {
        editedActivityDataRef.current.poster_image_uri = uri
      }
      errorManagement.updateErrors({
        posterImage: errorManagement.validatePosterImage(uri),
      })
      return
    }

    if (mode !== 'edit') {
      errorManagement.updateErrors({
        posterImage: errorManagement.validatePosterImage(null),
      })
    }
  }

  const toggleVisibleStudents = () => {
    setVisibleStudents(!visibleStudents)
    if (mode === 'edit') {
      editedActivityDataRef.current.visible_students = visibleStudents
    }
  }

  const toggleVisibleResearchers = () => {
    setVisibleResearchers(!visibleResearchers)
    if (mode === 'edit') {
      editedActivityDataRef.current.visible_researchers = visibleResearchers
    }
  }

  const toggleMandatory = () => {
    setMandatory(!mandatory)
    if (mode === 'edit') {
      editedActivityDataRef.current.mandatory = mandatory
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

  const updateActivity = async () => {
    setLoadingAction(true)
    try {
      const allFieldsCorrect = errorManagement.validateAllFields(
        title,
        description,
        '',
        locationManagement.location,
      )

      console.log(title)

      if (!allFieldsCorrect) {
        Toast.show({
          type: 'error',
          text1: 'Error al actualizar la actividad',
          text2: 'Corrige los errores e intentalo de nuevo',
        })
        return
      }

      const result = await activityService.updateActivity(
        editedActivityDataRef.current,
      )

      if (!result.success && 'error' in result) {
        Toast.show({
          type: 'error',
          text1: result.message,
          text2: result.error,
        })
        return
      }

      Toast.show({
        text1: 'Actividad actualizada',
        text2: 'Los datos de la actividad se han actualizado',
      })
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
      toggleVisibleStudents,
      toggleVisibleResearchers,
      toggleMandatory,
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
    updateActivity,
    setLoading,
    setLoadingAction,
  }
}
