import { useLocations } from '../../hooks/ActivityForm/useLocations'
import { useDates } from '../../hooks/ActivityForm/useDates'
import { useRequirements } from '../../hooks/ActivityForm/useRequirements'
import { useEffect, useRef, useState, useCallback } from 'react'
import * as ImagePicker from 'expo-image-picker'
import activityService from '../../services/activity.service'
import { NewActivityData, UpdateActivityData } from '../../types/Activity'
import { Option } from '../../components/shared/SelectInput/interfaces'
import Toast from 'react-native-toast-message'
import { useErrors } from '../../hooks/ActivityForm/useErrors'
import { mapToOption } from '../../utils/mappers'
import { ActivityRequirement, EditRequirement } from '../../types/Requirements'
import { useAppActions } from '../AppActionsContext'

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

  const [posterImg, setPosterImg] = useState<string | null>(
    mode === 'create' ? null : activityService.getActivityPosterUrl(activityId),
  )

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const editedActivityDataRef = useRef<UpdateActivityData>({
    activity_id: 0,
    requirements_to_add: [],
    requirements_to_edit: [],
    requirements_to_delete: [],
  })

  const { navigation } = useAppActions()

  const loadActivityData = useCallback(
    async (activityId: number): Promise<void> => {
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

        const initialRequirements =
          activity.requirements.map<ActivityRequirement>((req) => ({
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
          }))

        requirementsManagement.setInitialRequirements(initialRequirements)
        dateManagement.onActivityDateChange(new Date(activity.event_date))
        dateManagement.onLimitDateChange(new Date(activity.register_date_limit))

        editedActivityDataRef.current.activity_id = activity.activity_id
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    [
      locationManagement,
      requirementsManagement,
      dateManagement,
      setTitle,
      setDescription,
      setVisibleStudents,
      setVisibleResearchers,
      setMandatory,
      setLoading,
    ],
  )

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
    requirementsManagement.restartRequirements()
    locationManagement.onLocationChange(null)
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
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [9, 16],
      quality: 0.5,
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
      setPosterImg(null)
      errorManagement.updateErrors({
        posterImage: errorManagement.validatePosterImage(null),
      })
    }
  }

  const onAddRequirement = (
    name: string,
    description: string,
    template_uri: string | null,
  ) => {
    const newRequirementId = requirementsManagement.addRequirement(
      name,
      description,
      template_uri,
    )
    if (mode === 'edit') {
      editedActivityDataRef.current.requirements_to_add = [
        ...editedActivityDataRef.current.requirements_to_add,
        {
          requirement_id: newRequirementId,
          name,
          description,
          template:
            template_uri !== null
              ? {
                  requirement_template_id: 0,
                  template_uri,
                }
              : null,
        },
      ]
    }
  }

  const onDeleteRequirement = (requirementId: number) => {
    requirementsManagement.deleteRequirement(requirementId)
    if (mode === 'edit' && requirementId > 0) {
      editedActivityDataRef.current.requirements_to_delete.push(requirementId)
    }

    if (requirementId < 0) {
      editedActivityDataRef.current.requirements_to_add =
        editedActivityDataRef.current.requirements_to_add.filter(
          (req) => req.requirement_id !== requirementId,
        )
    }
  }

  const onEditRequirement = (requirementInfo: EditRequirement) => {
    requirementsManagement.editRequirement(requirementInfo)
    if (mode === 'edit' && requirementInfo.requirement_id > 0) {
      if (editedActivityDataRef.current.requirements_to_edit.length === 0) {
        editedActivityDataRef.current.requirements_to_edit.push(requirementInfo)
        return
      }

      const requirements_to_edit =
        editedActivityDataRef.current.requirements_to_edit.map((req) =>
          req.requirement_id === requirementInfo.requirement_id
            ? {
                ...req,
                ...requirementInfo,
              }
            : requirementInfo,
        )
      editedActivityDataRef.current.requirements_to_edit = requirements_to_edit
    }
  }

  const onActivityDateChange = (activityDate: Date) => {
    // Convertir a UTC
    const utcDate = new Date(
      activityDate.getTime() - activityDate.getTimezoneOffset() * 60000,
    )
    dateManagement.onActivityDateChange(activityDate)
    editedActivityDataRef.current.event_date = utcDate
  }

  const onLimitDateChange = (limitDate: Date) => {
    dateManagement.onLimitDateChange(limitDate)
    editedActivityDataRef.current.register_date_limit = limitDate
  }

  const toggleVisibleStudents = () => {
    const newVisibleStudents = !visibleStudents
    setVisibleStudents(newVisibleStudents)
    if (mode === 'edit') {
      editedActivityDataRef.current.visible_students = newVisibleStudents
    }
  }

  const toggleVisibleResearchers = () => {
    const newVisibleResearchers = !visibleResearchers
    setVisibleResearchers(newVisibleResearchers)
    if (mode === 'edit') {
      editedActivityDataRef.current.visible_researchers = newVisibleResearchers
    }
  }

  const toggleMandatory = () => {
    const newMandatory = !mandatory
    setMandatory(newMandatory)
    if (mode === 'edit') {
      editedActivityDataRef.current.mandatory = newMandatory
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
        new Date(dateManagement.activityDate.toString()),
        new Date(dateManagement.limitDate.toString()),
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
        new Date(dateManagement.activityDate.toString()),
        new Date(dateManagement.limitDate.toString()),
      )

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

      // setLoadingAction(false)

      // navigation.replace('/calendar')
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
      onActivityDateChange: onActivityDateChange,
      limitDate: dateManagement.limitDate,
      onLimitDateChange: onLimitDateChange,
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
      addRequirement: onAddRequirement,
      deleteRequirement: onDeleteRequirement,
      editRequirement: onEditRequirement,
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
