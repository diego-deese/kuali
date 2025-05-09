import { Activities, Prisma } from '../generated/client'

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
