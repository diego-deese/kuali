import { Activities } from '../generated/client'

export type UserAccesibleActivity = Omit<Activities,
'creation_date' |
'last_updated' |
'visible_students' |
'visible_researchers' |
'admin_creator_id' |
'location_id' |
'category_id' |
'mandatory'> & {
  isRegistered?: Boolean
}

export type ActivityInfo = Omit<UserAccesibleActivity, 'poster_image' | 'poster_mimetype'>
