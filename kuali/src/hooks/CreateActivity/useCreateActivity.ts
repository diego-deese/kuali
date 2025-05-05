import { useEffect, useState } from 'react'
import { Location } from '../../types/Location'
import locationService from '../../services/location.service'
import Toast from 'react-native-toast-message'

export const useCreateActivity = () => {
  const [eventDate, setEventDate] = useState(new Date())
  const [limitDate, setLimitDate] = useState(eventDate)
  const [locations, setLocations] = useState<Location[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingAction, setLoadingAction] = useState(false)

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

  useEffect(() => {
    getLocations()
  }, [])

  return {
    eventDate: {
      eventDate,
      setEventDate,
    },
    limitDate: {
      limitDate,
      setLimitDate,
    },
    location: {
      locations,
      updateLocationName,
      deleteLocation,
    },
    loading,
    loadingAction,
  }
}
