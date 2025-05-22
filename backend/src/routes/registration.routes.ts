import { Router } from 'express'
import registrationController from '../controllers/registration.controller'

const router = Router()

router.get('/activity/:activity_id', registrationController.getAllUsersByActivity)

export default router
