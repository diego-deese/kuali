import { Router } from 'express'
import locationController from '../controllers/location.controller'
import { isAdmin } from '../middlewares/role.middleware'
import { isAuthenticated } from '../middlewares/jwt.middleware'

const router = Router()

router.get('/', isAuthenticated, isAdmin, locationController.getLocations)

router.post('/', isAuthenticated, isAdmin, locationController.createLocation)

router.put('/:locationId', isAuthenticated, isAdmin, locationController.renameLocation)

router.delete('/:locationId', isAuthenticated, isAdmin, locationController.deleteLocation)

export default router
