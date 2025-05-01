import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import { useAuth } from '../../context/AuthContext'
import activityService from '../../services/activity.service'
import { Activity } from '../../types/Activity'

export const useMyActivities = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')
  const [viewMode, setViewMode] = useState<'list' | 'card'>('card')
  const [upcomingActivities, setUpcomingActivities] = useState<
    Activity[] | null
  >(null)
  const [pastActivities, setPastActivities] = useState<Activity[] | null>(null)
  const [loadingActivities, setLoadingActivities] = useState(false)

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
    if (user && user.user_id) {
      if (upcomingActivities === null) getUpcomingActivities(user.user_id)
      if (pastActivities === null) getPastActivities(user.user_id)
    }
    console.log('Upcoming: ', upcomingActivities, ' | Past: ', pastActivities)
  }, [user, upcomingActivities, pastActivities])

  const getUpcomingActivities = async (userId: number) => {
    try {
      setLoadingActivities(true)
      const result = await activityService.getUpcomingActivities(userId)

      if (!result.success && 'error' in result) {
        Toast.show({
          type: 'error',
          text1: result.message,
          text2: result.error,
        })
      } else {
        if (Array.isArray(result.data)) {
          setUpcomingActivities(result.data as Activity[])
        } else {
          setUpcomingActivities([])
        }
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

  const getPastActivities = async (userId: number) => {
    try {
      setLoadingActivities(true)

      const result = await activityService.getPastActivities(userId)

      if (!result.success && 'error' in result) {
        Toast.show({
          type: 'error',
          text1: result.message,
          text2: result.error,
        })
      } else {
        if (Array.isArray(result.data)) {
          setPastActivities(result.data as Activity[])
        } else {
          setPastActivities([])
        }
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
    showViewSelector: activeTab === 'upcoming',
  }
}
