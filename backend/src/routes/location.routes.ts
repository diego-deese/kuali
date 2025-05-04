import { Router } from 'express'
import locationController from '../controllers/location.controller'
import { isAdmin } from '../middlewares/role.middleware'
import { isAuthenticated } from '../middlewares/jwt.middleware'

const router = Router()

router.get('/', isAuthenticated, isAdmin, locationController.getLocations)

router.put('/:locationId', isAuthenticated, isAdmin, locationController.renameLocation)

export default router
