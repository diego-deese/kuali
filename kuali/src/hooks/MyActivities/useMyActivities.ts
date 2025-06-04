import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import { useAuth } from '../../context/AuthContext'
import activityService from '../../services/activity.service'
import { Activity } from '../../types/Activity'
import { Roles } from '../../constants/roles'

export const useMyActivities = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')
  const [viewMode, setViewMode] = useState<'list' | 'card'>('card')
  const [upcomingActivities, setUpcomingActivities] = useState<
    Activity[] | null
  >(null)
  const [pastActivities, setPastActivities] = useState<Activity[] | null>(null)
  const [loadingActivities, setLoadingActivities] = useState(false)

  const [refreshing, setRefreshing] = useState(false)

  const { user } = useAuth()

  const handleTabChange = (tab) => {
    setActiveTab(tab)

    if (tab === 'past') {
      setViewMode('list')
    } else {
      setViewMode('card')
    }
  }

  const handleViewModeChange = (mode) => {
    setViewMode(mode)
  }

  const activitiesToDisplay =
    activeTab === 'upcoming' ? upcomingActivities : pastActivities

  useEffect(() => {
    if (!user && user.user_id) {
      return
    }

    // When user is admin get activities to review
    if (user.role.role_id === Roles.ADMIN) {
      if (upcomingActivities === null) getActivitiesToReview()
    } else {
      if (upcomingActivities === null) getUpcomingActivities()
    }

    if (pastActivities === null) getPastActivities()
  }, [upcomingActivities, pastActivities, user])

  const handleRefresh = () => {
    setRefreshing(true)
    setUpcomingActivities(null)
    setPastActivities(null)
    setRefreshing(false)
  }

  const getUpcomingActivities = async () => {
    try {
      setLoadingActivities(true)
      const result = await activityService.getUpcomingActivities()

      if (!result.success && 'error' in result) {
        Toast.show({
          type: 'error',
          text1: result.message,
          text2: result.error,
        })
      } else {
        setUpcomingActivities(result.data as Activity[])
      }
    } catch (error) {
      console.error('Error al obtener actividades:', error)
      Toast.show({
        type: 'error',
        text1: 'Error al cargar actividades',
        text2: 'Por favor intenta de nuevo más tarde',
      })
      setUpcomingActivities([])
    } finally {
      setLoadingActivities(false)
    }
  }

  const getPastActivities = async () => {
    try {
      setLoadingActivities(true)

      const result = await activityService.getPastActivities()

      if (!result.success && 'error' in result) {
        Toast.show({
          type: 'error',
          text1: result.message,
          text2: result.error,
        })
      } else {
        setPastActivities(result.data as Activity[])
      }
    } catch (error) {
      console.error('Error al obtener actividades:', error)
      Toast.show({
        type: 'error',
        text1: 'Error al cargar actividades',
        text2: 'Por favor intenta de nuevo más tarde',
      })
      setPastActivities([])
    } finally {
      setLoadingActivities(false)
    }
  }

  const getActivitiesToReview = async () => {
    try {
      setLoadingActivities(true)

      const result = await activityService.getActivitiesToReview()

      if (!result.success && 'error' in result) {
        Toast.show({
          type: 'error',
          text1: result.message,
          text2: result.error,
        })
        setUpcomingActivities([])
        return
      }

      setUpcomingActivities(result.data as Activity[])
    } catch (error) {
      console.error('Error al obtener actividades a revisar:', error)
      Toast.show({
        type: 'error',
        text1: 'Error al cargar actividades a revisar',
        text2: 'Por favor intenta de nuevo más tarde',
      })
      setUpcomingActivities([])
    } finally {
      setLoadingActivities(false)
    }
  }

  return {
    viewMode: {
      viewMode,
      handleViewModeChange,
    },
    activeTab: {
      activeTab,
      handleTabChange,
    },
    activities: {
      activitiesToDisplay,
      loadingActivities,
      getUpcomingActivities,
    },
    showViewSelector:
      activeTab === 'upcoming' &&
      activitiesToDisplay !== null &&
      activitiesToDisplay.length > 0,
    refreshing,
    handleRefresh,
  }
}
