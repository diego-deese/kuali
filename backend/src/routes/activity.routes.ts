import { Router } from 'express'
import activityController from '../controllers/activity.controller'
import { isAdmin } from '../middlewares/role.middleware'
import { isAuthenticated } from '../middlewares/jwt.middleware'
import { uploadMemory } from '../middlewares/upload-files.middleware'

const router = Router()

router.get('/', isAuthenticated, activityController.getActivities)

router.post('/', isAuthenticated, isAdmin, uploadMemory.fields([{ name: 'template_files' }, { name: 'poster_image', maxCount: 1 }]), activityController.createActivity)

router.get('/upcoming/user', isAuthenticated, activityController.getUserUpcomingActivities)

router.get('/upcoming', isAuthenticated, activityController.getUpcomingActivities)

router.get('/past/user', isAuthenticated, activityController.getUserPastActivities)

router.get('/:activityId', isAuthenticated, activityController.getActivity)
router.patch('/:activityId', isAuthenticated, isAdmin, uploadMemory.single('poster_image'), activityController.updateActivity)
router.delete('/:activityId', isAuthenticated, isAdmin, activityController.deleteActivity)

router.get('/:activityId/poster', activityController.getActivityPoster)

export default router
