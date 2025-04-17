import { Router } from 'express'
import activityController from '../controllers/activity.controller'

const router = Router()

router.get('/', activityController.getActivities)
router.get('/upcoming', activityController.getUpcomingActivities)
router.get('/:id/', activityController.getActivity)

router.post('/', activityController.createActivity)

router.delete('/:id', activityController.deleteActivity)

export default router
