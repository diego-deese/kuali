import { Router } from 'express'
import { isAuthenticated } from '../middlewares/jwt.middleware'
import notificationController from '../controllers/notification.controller'

const router = Router()

router.get('/', isAuthenticated, notificationController.getUserNotifications)

export default router
