import { createContext, useContext } from 'react'
import { useCreateActivity } from './useCreateActivity'
import { Option } from '../../components/shared/SelectInput/interfaces'
import { Location } from '../../types/Location'
import { DateType } from 'react-native-ui-datepicker'
import { ActivityRequirement } from '../../types/Requirements'

interface CreateActivityContextProps {
  dates?: {
    activityDate: DateType
    onActivityDateChange: (newDate: DateType) => void
    limitDate: DateType
    onLimitDateChange: (newDate: DateType) => void
  }
  location?: {
    location: Option
    locations: Location[]
    onLocationChange: (newLocation: Option) => void
    updateLocationName: (location_id: number, newName: string) => Promise<void>
    deleteLocation: (location_id: number) => Promise<void>
    createLocation: (name: string) => Promise<Option | void>
  }
  activityOptions?: {
    visibleStudents: boolean
    visibleResearchers: boolean
    mandatory: boolean
    setVisibleStudents: (value: boolean) => void
    setVisibleResearchers: (value: boolean) => void
    setMandatory: (value: boolean) => void
  }
  requirements?: {
    requirements: ActivityRequirement[]
    addRequirement: (name: string, description: string) => void
    deleteRequirement: (requirementId: number) => void
    editRequirement: (
      requirementId: number,
      name: string,
      description: string,
    ) => void
  }
  loading?: boolean
  loadingAction?: boolean
  setLoading?: (value: boolean) => void
  setLoadingAction?: (value: boolean) => void
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
