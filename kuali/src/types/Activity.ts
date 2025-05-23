import { Category } from './Category'
import { Location } from './Location'
import { ActivityRequirement, Requirements } from './Requirements'

export type Activity = {
  activity_id: number
  title: string
  description: string
  event_date: string
  register_date_limit: string
  mandatory?: false
  isRegistered?: boolean // Añade esta propiedad como opcional
  location: Location
  category: Category
  requirements: Requirements[]
}

export type NewActivityData = {
  title: string
  description: string
  event_date: Date
  register_date_limit: Date
  mandatory: boolean
  visible_researchers: boolean
  visible_students: boolean
  location_id: number
  requirements?: ActivityRequirement[]
  poster_image_uri: string
}
