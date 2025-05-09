import { Router } from 'express'
import activityController from '../controllers/activity.controller'
import { extractUserRole, isAdmin } from '../middlewares/role.middleware'
import { isAuthenticated } from '../middlewares/jwt.middleware'

const router = Router()

router.get('/', isAuthenticated, extractUserRole, activityController.getActivities)

router.post('/', isAuthenticated, isAdmin, activityController.createActivity)

router.get('/:activityId', isAuthenticated, activityController.getActivity)
router.delete('/:activityId', isAuthenticated, isAdmin, activityController.deleteActivity)

router.get('/:activityId/poster', isAuthenticated, activityController.getActivityPoster)

router.get('/upcoming', isAuthenticated, activityController.getUpcomingActivities)

export default router
