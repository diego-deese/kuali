import { Activities, Prisma } from '../generated/client'
import { UpdateActivityRequirement } from './Requirement'

export type UserAccesibleActivity = Omit<Activities,
'creation_date' |
'last_updated' |
'visible_students' |
'visible_researchers' |
'admin_creator_id' |
'location_id' |
'category_id' |
'poster_image' |
'poster_mimetype'> & {
  isRegistered?: Boolean
}

export type ActivityInfo = Omit<UserAccesibleActivity, 'poster_image' | 'poster_mimetype'>

const activityPoster = Prisma.validator<Prisma.ActivitiesDefaultArgs>()({
  select: {
    poster_image: true,
    poster_mimetype: true
  }
})

export type ActivityPoster = Prisma.ActivitiesGetPayload<typeof activityPoster>

const newActivity = Prisma.validator<Prisma.ActivitiesDefaultArgs>()({
  select: {
    title: true,
    description: true,
    event_date: true,
    register_date_limit: true,
    mandatory: true,
    visible_researchers: true,
    visible_students: true,
    admin_creator_id: true,
    location_id: true,
    category_id: true,
    requirements: {
      select: {
        name: true,
        description: true,
        template: {
          select: {
            name: true,
            file_content: true,
            mimetype: true
          }
        }
      }
    },
    poster_image: true,
    poster_mimetype: true
  }
})

export type NewActivity = Prisma.ActivitiesGetPayload<typeof newActivity>

export interface UpdateActivity {
  activity_id: number
  title?: string
  description?: string
  event_date?: Date
  register_date_limit?: Date
  mandatory?: boolean
  visible_researchers?: boolean
  visible_students?: boolean
  location_id?: number
  category_id?: number
  poster_image?: Uint8Array
  poster_mimetype?: string
  requirements?: UpdateActivityRequirement[]
}

const createdActivity = Prisma.validator<Prisma.ActivitiesDefaultArgs>()({
  omit: {
    location_id: true,
    category_id: true,
    poster_image: true,
    poster_mimetype: true
  },
  include: {
    category: true,
    location: true,
    requirements: {
      include: {
        template: {
          select: {
            requirement_template_id: true,
            name: true
          }
        }
      }
    }
  }
})

export type CreatedActivity = Prisma.ActivitiesGetPayload<typeof createdActivity>
