import { useState, useEffect } from 'react'
import Toast from 'react-native-toast-message'
import { Option } from '../../components/shared/SelectInput/interfaces'
import { Location } from '../../types/Location'
import locationService from '../../services/location.service'
import { mapToOption } from '../../utils/mappers'
import { InputError } from '../../types/Error'

export const useLocations = () => {
  const [locations, setLocations] = useState<Location[] | null>(null)
  const [location, setLocation] = useState<Option | null>(null)
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
        setLocations(
          (prevOptions) =>
            prevOptions?.map((option) =>
              option.location_id === location_id
                ? { ...option, name: newName }
                : option,
            ) ?? null,
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
        setLocations(
          (prevOptions) =>
            prevOptions?.filter(
              (location) => location.location_id !== location_id,
            ) ?? null,
        )
        Toast.show({
          type: 'success',
          text1: 'Lugar eliminado',
          text2: 'El lugar se eliminó correctamente.',
        })
      }
    } catch (error) {
      console.error('Error al eliminar el lugar:', error)
      Toast.show({
        type: 'error',
        text1: 'Error al eliminar el lugar',
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

  const onLocationChange = (newLocation: Option) => {
    setLocation(newLocation)
  }

  useEffect(() => {
    getLocations()
  }, [])

  return {
    location,
    locations,
    onLocationChange,
    updateLocationName,
    deleteLocation,
    createLocation,
    loading,
    loadingAction,
  }
}
