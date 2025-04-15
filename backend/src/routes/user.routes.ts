import { Router } from 'express'
import userController from '../controllers/user.controller'
import activityController from '../controllers/activity.controller'

const router = Router()

router.get('/', userController.getUsers) // Add middleware
router.get('/:id', userController.getUser) // Add middleware
router.get('/:id/activities/upcoming', activityController.getUserUpcomingActivities) // Add middleware
router.get('/:id/activities/past', activityController.getUserPastActivities) // Add middleware
router.get('/:userId/activities/:activityId', activityController.getActivityWithUserDetails) // Add middleware

router.post('/', userController.createUser) // Add middleware

router.put('/:id', userController.updateUser) // Add middleware

router.patch('/:id/password', userController.updatePasswordWithValidation) // Add middleware

router.delete('/:id', userController.deleteUser) // Add middleware

export default router
