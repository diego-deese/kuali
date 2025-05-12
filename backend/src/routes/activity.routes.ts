import { Router } from 'express'
import activityController from '../controllers/activity.controller'
import { isAdmin } from '../middlewares/role.middleware'
import { isAuthenticated } from '../middlewares/jwt.middleware'

const router = Router()

router.get('/', isAuthenticated, activityController.getActivities)

router.post('/', isAuthenticated, isAdmin, activityController.createActivity)

router.get('/upcoming/user', isAuthenticated, activityController.getUserUpcomingActivities)

router.get('/upcoming', isAuthenticated, activityController.getUpcomingActivities)

router.get('/past/user', isAuthenticated, activityController.getUserPastActivities)

router.get('/:activityId', isAuthenticated, activityController.getActivity)
router.delete('/:activityId', isAuthenticated, isAdmin, activityController.deleteActivity)

router.get('/:activityId/poster', activityController.getActivityPoster)

export default router
