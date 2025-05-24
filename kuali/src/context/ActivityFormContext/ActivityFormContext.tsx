import { createContext, useContext } from 'react'
import { useActivityForm } from './useActivityForm'
import { Option } from '../../components/shared/SelectInput/interfaces'
import { Location } from '../../types/Location'
import { DateType } from 'react-native-ui-datepicker'
import { ActivityRequirement } from '../../types/Requirements'
import { ActivityErrors } from '../../types/Error'

interface ActivityFormContextProps {
  mode: 'create' | 'edit'
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
    addRequirement: (
      name: string,
      description: string,
      templateUri?: string,
    ) => void
    deleteRequirement: (requirementId: number) => void
    editRequirement: (
      requirementId: number,
      name: string,
      description: string,
      templateUri: string,
    ) => void
  }
  title?: {
    title: string
    onTitleChange: (title: string) => void
  }
  description?: {
    description: string
    onDescriptionChange: (description: string) => void
  }
  posterImg?: {
    posterImg: string
    selectPosterImg?: () => void
  }
  loading?: boolean
  loadingAction?: boolean
  setLoading?: (value: boolean) => void
  setLoadingAction?: (value: boolean) => void
  createActivity?: () => void
  errors?: ActivityErrors
}

const ActivityFormContext = createContext<ActivityFormContextProps>({
  mode: 'create',
})

export const useActivityFormContext = () => {
  const context = useContext(ActivityFormContext)
  if (context === undefined) {
    throw new Error(
      'useCreateActivityContext must be used within a CreateActivityProvider',
    )
  }
  return context
}

interface ActivityFormProviderProps {
  children: React.ReactNode
  mode: 'create' | 'edit'
  activityId?: number
}

export const ActivityFormProvider = ({
  children,
  mode,
  activityId,
}: ActivityFormProviderProps) => {
  const value = useActivityForm(mode, activityId)
  return (
    <ActivityFormContext.Provider value={value}>
      {children}
    </ActivityFormContext.Provider>
  )
}
