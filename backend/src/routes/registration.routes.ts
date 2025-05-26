import { Router } from 'express'
import { isAuthenticated } from '../middlewares/jwt.middleware'
import registrationController from '../controllers/registration.controller'

const router = Router()

router.post('/activity/:activityId', isAuthenticated, registrationController.createRegistration)
router.delete('/activity/:activityId', isAuthenticated, registrationController.deleteRegistration)

export default router
