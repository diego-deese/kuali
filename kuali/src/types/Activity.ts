import { Category } from './Category'
import { Location } from './Location'
import { Requirements } from './Requirements'

export type Activity = {
  activity_id: number
  title: string
  description: string
  event_date: string
  register_date_limit: string
  mandatory: false
  location: Location
  category: Category
  requirements: Requirements[]
}
