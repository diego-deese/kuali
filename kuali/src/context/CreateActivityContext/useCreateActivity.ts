import { useLocations } from '../../hooks/CreateActivity/useLocations'
import { useDates } from '../../hooks/CreateActivity/useDates'
import { useRequirements } from '../../hooks/CreateActivity/useRequirements'
import { useState } from 'react'
import * as FileSystem from 'expo-file-system'

export const useCreateActivity = () => {
  const locationManagement = useLocations()
  const dateManagement = useDates()
  const requirementsManagement = useRequirements()

  const [visibleStudents, setVisibleStudents] = useState(true)
  const [visibleResearchers, setVisibleResearchers] = useState(true)
  const [mandatory, setMandatory] = useState(false)

  const [loading, setLoading] = useState(false)
  const [loadingAction, setLoadingAction] = useState(false)

  const imgDir = FileSystem.documentDirectory + 'images/'

  const checkImgDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir)

    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true })
    }
  }

  // const selectPosterImg = async () => {
  //   const result = await
  // }

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
  }
}
