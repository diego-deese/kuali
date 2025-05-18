import { useLocations } from '../../hooks/CreateActivity/useLocations'
import { useDates } from '../../hooks/CreateActivity/useDates'
import { useRequirements } from '../../hooks/CreateActivity/useRequirements'
import { useEffect, useState } from 'react'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import activityService from '../../services/activity.service'
import { NewActivityData } from '../../types/Activity'

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

  const imgDir = FileSystem.documentDirectory + 'images/'

  const checkImgDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir)

    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true })
    }
  }

  const selectPosterImg = async () => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [9, 16],
      quality: 0.7,
    }

    const result = await ImagePicker.launchImageLibraryAsync(options)

    if (!result.canceled) {
      setPosterImg(result.assets[0].uri)
    }
  }

  const createActivity = async () => {
    const activityData: NewActivityData = {
      title: 'Test RN',
      description: 'Test RN',
      visible_students: visibleStudents,
      visible_researchers: visibleResearchers,
      mandatory,
      location_id: 1,
      event_date: dateManagement.activityDate as Date,
      register_date_limit: dateManagement.limitDate as Date,
      requirements: requirementsManagement.requirements,
      poster_image_uri: posterImg,
    }

    await activityService.createActivity(activityData)
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
      onLocationChange: locationManagement.onLocationChange,
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
    loading,
    loadingAction,
    setLoading,
    setLoadingAction,
    selectPosterImg,
    createActivity,
    posterImg,
  }
}
