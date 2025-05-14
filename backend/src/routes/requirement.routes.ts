import { Router } from 'express'
import { isAdmin } from '../middlewares/role.middleware'
import { isAuthenticated } from '../middlewares/jwt.middleware'
import requirementController from '../controllers/requirement.controller'

const router = Router()

router.post('/', isAuthenticated, isAdmin, requirementController.createRequirement)

router.get('/:requirementId', isAuthenticated, isAdmin, requirementController.getRequirement)
router.put('/:requirementId', isAuthenticated, isAdmin, requirementController.updateRequirement)
router.patch('/:requirementId', isAuthenticated, isAdmin, requirementController.patchRequirement)

export default router
