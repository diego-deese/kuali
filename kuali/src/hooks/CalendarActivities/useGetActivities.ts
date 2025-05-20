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
  const [events, setEvents] = useState<CalendarEvent[]>([])
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
        const parsed = response.activities.map((activity: Activity) => ({
          id: activity.activity_id,
          title: activity.title,
          start: dayjs(activity.event_date).toDate(),
          end: dayjs(activity.event_date).add(30, 'minute').toDate(), // or use `register_date_limit` if you want that as the `end`
        }))
        setEvents(parsed)
      } else {
        setError(true)
      }
    }
    initialize()
  }, [])

  return { events, error, loading }
}
