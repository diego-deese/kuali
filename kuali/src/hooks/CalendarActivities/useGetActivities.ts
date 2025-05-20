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
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<string | null>(null)

  useEffect(() => {
    const initialize = async () => {
      const token = await authService.getToken()
      if (!token) {
        console.log('no hay token')
        return
      }

      const response = await activityService.getAllActivities()
      if (response.success) {
        setActivities(response.activities)
      } else {
        setError(true)
      }
    }
    initialize()
  }, [])

  return { activities, error, loading }
}
