import { Router } from 'express'
import { isAuthenticated } from '../middlewares/jwt.middleware'
import { isAdmin } from '../middlewares/role.middleware'
import requirementTemplateController from '../controllers/requirement-template.controller'

const router = Router()

router.get('/download/:fileId', isAuthenticated, requirementTemplateController.downloadFile)

router.post('/upload/:activityId', isAuthenticated, isAdmin, requirementTemplateController.uploadFile)

export default router
