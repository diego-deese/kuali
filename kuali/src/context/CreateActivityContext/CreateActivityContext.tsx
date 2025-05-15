import { createContext, useContext } from 'react'
import { useCreateActivity } from './useCreateActivity'
import { Option } from '../../components/shared/SelectInput/interfaces'
import { Location } from '../../types/Location'

interface CreateActivityContextProps {
  activityDate?: {
    activityDate: Date
    onActivityDateChange: (newDate: Date) => void
  }
  limitDate?: {
    limitDate: Date
    onLimitDateChange: (newDate: Date) => void
  }
  location?: {
    location: Option
    locations: Location[]
    onLocationChange: (newLocation: Option) => void
    updateLocationName: (location_id: number, newName: string) => Promise<void>
    deleteLocation: (location_id: number) => Promise<void>
    createLocation: (name: string) => Promise<Option | void>
  }
  loading?: boolean
  loadingAction?: boolean
}

const CreateActivityContext = createContext<CreateActivityContextProps>({})

export const useCreateActivityContext = () => {
  return useContext(CreateActivityContext)
}

export const CreateActivityProvider = ({ children }: any) => {
  const value = useCreateActivity()
  return (
    <CreateActivityContext.Provider value={value}>
      {children}
    </CreateActivityContext.Provider>
  )
}
