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
  const [loading, setLoading] = useState<string | null>(null)

  const today = new Date()

  useEffect(() => {
    const initialize = async () => {
      const token = await authService.getToken()
      if (!token) {
        console.log('no hay token')
        return
      }

      const response = await activityService.getAllActivities()
      if (response.success) {
        const allActivities = response.activities

        const upcoming = allActivities.filter((activity: Activity) => {
          const now = dayjs()
          const eventDate = dayjs(activity.event_date)
          return eventDate.isAfter(now) && eventDate.isBefore(now.add(7, 'day'))
        })

        setActivities(allActivities)
        setUpcomingActivities(upcoming)
      } else {
        setError(true)
      }
    }
    initialize()
  }, [])

  return { activities, upcomingActivities, error, loading }
}
