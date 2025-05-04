import { useEffect, useState } from 'react'
import { Location } from '../../types/Location'
import locationService from '../../services/location.service'
import Toast from 'react-native-toast-message'

export const useCreateActivity = () => {
  const [eventDate, setEventDate] = useState(new Date())
  const [limitDate, setLimitDate] = useState(eventDate)
  const [locations, setLocations] = useState<Location[] | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [locationToDelete, setLocationToDelete] = useState<Location | null>(
    null,
  )
  const [loading, setLoading] = useState(false)

  const updateLocationName = async (id: number, newLabel: string) => {
    setLoading(true)
    try {
      const result = await locationService.renameLocation(id, newLabel)

      if (!result.success && 'error' in result) {
        Toast.show({
          type: 'error',
          text1: result.message,
          text2: result.error,
        })
      } else {
        console.log('Se edito')
        setLocations((prevOptions) =>
          prevOptions.map((option) =>
            option.location_id === id ? { ...option, label: newLabel } : option,
          ),
        )
      }
    } catch (error) {
      console.error('Error al renombrar el lugar:', error)
      Toast.show({
        type: 'error',
        text1: 'Error renombrar el lugar',
        text2: 'Por favor intenta de nuevo más tarde',
      })
    } finally {
      setLoading(false)
    }
  }

  const confirmDeleteLocation = () => {
    if (locationToDelete !== null) {
      setLocations((prevOptions) =>
        prevOptions.filter(
          (location) => location.location_id !== locationToDelete.location_id,
        ),
      )
      setLocationToDelete(null)
    }
    setIsModalVisible(false)
  }

  const deleteLocation = (location: Location) => {
    setLocationToDelete(location)
    setIsModalVisible(true)
  }

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
      locationToDelete,
      updateLocationName,
      confirmDeleteLocation,
      deleteLocation,
    },
    modal: {
      isModalVisible,
      setIsModalVisible,
    },
    loading,
  }
}
