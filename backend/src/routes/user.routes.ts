import { Router } from 'express'
import userController from '../controllers/user.controller'
import activityController from '../controllers/activity.controller'
import { isAuthenticated } from '../middlewares/jwt.middleware'
import { isAdmin } from '../middlewares/role.middleware'

const router = Router()

router.get('/', isAuthenticated, isAdmin, userController.getUsers)
router.get('/:id', isAuthenticated, userController.getUser)
router.get('/:id/profilePhoto', userController.getUserProfilePhoto)
router.get('/:id/activities/upcoming', isAuthenticated, activityController.getUserUpcomingActivities)
router.get('/:id/activities/past', isAuthenticated, activityController.getUserPastActivities)
router.get('/:userId/activities/:activityId', isAuthenticated, activityController.getActivityWithUserDetails)

router.post('/', isAuthenticated, isAdmin, userController.createUser)

router.put('/:id', isAuthenticated, isAdmin, userController.updateUser)

router.patch('/:id/password', isAuthenticated, userController.updatePasswordWithValidation)

router.delete('/:id', isAuthenticated, isAdmin, userController.deleteUser)

export default router
