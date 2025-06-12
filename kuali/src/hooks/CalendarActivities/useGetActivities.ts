import { useEffect, useState } from 'react'
import { Activity } from '../../types/Activity'
import authService from '../../services/auth.service'
import activityService from '../../services/activity.service'
import dayjs from 'dayjs'

type CalendarEvent = {
  id: number
  title: string
  start: Date
  end: Date
}

export function useGetActivities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [upcomingActivities, setUpcomingActivities] = useState<Activity[]>([])
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)

  const [isRefreshing, setIsRefreshing] = useState(false)

  const initialize = async () => {
    setLoading(true)
    const token = await authService.getToken()
    if (!token) {
      console.log('no hay token')
      return
    }

    const response = await activityService.getAllActivities()
    if (response.success) {
      const allActivities = response.activities

      const upcoming = allActivities.filter((activity: Activity) => {
        const now = dayjs().startOf('day')
        const eventDate = dayjs(activity.event_date)
        return (
          (eventDate.isAfter(now) || eventDate.isSame(now, 'day')) &&
          eventDate.isBefore(now.add(7, 'day'))
        )
      })

      setActivities(allActivities)
      setUpcomingActivities(upcoming)
    } else {
      setError(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    initialize()
  }, [])

  const refresh = () => {
    setIsRefreshing(true)
    initialize()
    setIsRefreshing(false)
  }

  return {
    activities,
    upcomingActivities,
    error,
    loading,
    refresh: {
      refresh,
      isRefreshing,
    },
  }
}
