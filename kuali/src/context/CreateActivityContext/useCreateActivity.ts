import { useEffect, useState } from 'react'
import { Location } from '../../types/Location'
import locationService from '../../services/location.service'
import Toast from 'react-native-toast-message'
import { Option } from '../../components/shared/SelectInput/interfaces'
import { mapToOption } from '../../utils/mappers'
import { DateType } from 'react-native-ui-datepicker'
import { ActivityRequirement } from '../../types/Requirements'

export const useCreateActivity = () => {
  const [activityDate, setActivityDate] = useState<DateType>(new Date())
  const [limitDate, setLimitDate] = useState(activityDate)
  const [locations, setLocations] = useState<Location[] | null>(null)
  const [location, setLocation] = useState<Option | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingAction, setLoadingAction] = useState(false)
  const [requirements, setRequirements] = useState<ActivityRequirement[]>([
    {
      requirement_id: 1,
      name: 'Constancia',
      description: 'Constancia de estudios',
    },
    {
      requirement_id: 2,
      name: 'Carta responsiva',
      description: 'Carta responsiva firmada',
    },
  ])

  const getLocations = async () => {
    setLoading(true)
    try {
      const result = await locationService.getLocations()

      if (!result.success && 'error' in result) {
        Toast.show({
          type: 'error',
          text1: result.message,
          text2: result.error,
        })
      } else {
        setLocations(result.data)
      }
    } catch (error) {
      console.error('Error al obtener actividades:', error)
      Toast.show({
        type: 'error',
        text1: 'Error al cargar los lugares',
        text2: 'Por favor intenta de nuevo más tarde',
      })
      setLocations([])
    } finally {
      setLoading(false)
    }
  }

  const updateLocationName = async (location_id: number, newName: string) => {
    setLoadingAction(true)
    try {
      const result = await locationService.renameLocation(location_id, newName)

      if (!result.success && 'error' in result) {
        Toast.show({
          type: 'error',
          text1: result.message,
          text2: result.error,
        })
      } else {
        setLocations((prevOptions) =>
          prevOptions.map((option) => {
            return option.location_id === location_id
              ? { ...option, name: newName }
              : option
          }),
        )
        Toast.show({
          type: 'success',
          text1: 'Lugar actualizado',
          text2: 'El nombre del lugar se actualizó correctamente.',
        })
      }
    } catch (error) {
      console.error('Error al renombrar el lugar:', error)
      Toast.show({
        type: 'error',
        text1: 'Error renombrar el lugar',
        text2: 'Por favor intenta de nuevo más tarde',
      })
    } finally {
      setLoadingAction(false)
    }
  }

  const deleteLocation = async (location_id: number) => {
    setLoadingAction(true)
    try {
      const result = await locationService.deleteLocation(location_id)

      if (!result.success && 'error' in result) {
        Toast.show({
          type: 'error',
          text1: result.message,
          text2: result.error,
        })
      } else {
        setLocations((prevOptions) =>
          prevOptions.filter(
            (location) => location.location_id !== location_id,
          ),
        )
        Toast.show({
          type: 'success',
          text1: 'Lugar eliminado',
          text2: 'El lugar se eliminó correctamente.',
        })
      }
    } catch (error) {
      console.error('Error al renombrar el lugar:', error)
      Toast.show({
        type: 'error',
        text1: 'Error renombrar el lugar',
        text2: 'Por favor intenta de nuevo más tarde',
      })
    } finally {
      setLoadingAction(false)
    }
  }

  const createLocation = async (name: string): Promise<Option | void> => {
    setLoadingAction(true)
    try {
      const result = await locationService.createLocation(name)

      if (!result.success && 'error' in result) {
        Toast.show({
          type: 'error',
          text1: result.message,
          text2: result.error,
        })
      } else {
        setLocations((prevOptions) => [...(prevOptions || []), result.data])
        Toast.show({
          type: 'success',
          text1: 'Lugar creado',
          text2: 'El lugar se creó correctamente.',
        })
        return mapToOption(result.data, 'location_id', 'name')
      }
    } catch (error) {
      console.error('Error al crear el lugar:', error)
      Toast.show({
        type: 'error',
        text1: 'Error al crear el lugar',
        text2: 'Por favor intenta de nuevo más tarde',
      })
    } finally {
      setLoadingAction(false)
    }
  }

  const addRequirement = (name: string, description: string) => {
    const newRequirementId = requirements.length + 1
    setRequirements((prevRequirements) => [
      ...prevRequirements,
      { requirement_id: newRequirementId, name, description },
    ])
  }

  const deleteRequirement = (requirementId: number) => {
    setRequirements((prevRequirements) =>
      prevRequirements.filter(
        (requirement) => requirement.requirement_id !== requirementId,
      ),
    )
  }

  const editRequirement = (
    requiremetId: number,
    name: string,
    description: string,
  ) => {
    setRequirements((prevRequirements) =>
      prevRequirements.map((requirement) =>
        requirement.requirement_id === requiremetId
          ? { ...requirement, name, description }
          : requirement,
      ),
    )
  }

  const onActivityDateChange = (newDate: Date) => {
    setActivityDate(newDate)
  }

  const onLimitDateChange = (newDate: Date) => {
    setLimitDate(newDate)
  }

  const onLocationChange = (newLocation: Option) => {
    setLocation(newLocation)
  }

  useEffect(() => {
    getLocations()
  }, [])

  return {
    activityDate: {
      activityDate,
      onActivityDateChange,
    },
    limitDate: {
      limitDate,
      onLimitDateChange,
    },
    location: {
      location,
      locations,
      onLocationChange,
      updateLocationName,
      deleteLocation,
      createLocation,
    },
    requirements: {
      requirements,
      addRequirement,
      deleteRequirement,
      editRequirement,
    },
    loading,
    loadingAction,
  }
}
