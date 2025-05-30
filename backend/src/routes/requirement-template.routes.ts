import { Router } from 'express'
import { isAuthenticated } from '../middlewares/jwt.middleware'
import { isAdmin } from '../middlewares/role.middleware'
import requirementTemplateController from '../controllers/requirement-template.controller'
import { uploadMemory } from '../middlewares/upload-files.middleware'

const router = Router()

router.put('/:fileId', isAuthenticated, isAdmin, uploadMemory.single('file'), requirementTemplateController.updateTemplateFile)

router.get('/download/:fileId', isAuthenticated, requirementTemplateController.downloadFile)

router.post('/upload/:activityId', isAuthenticated, isAdmin, uploadMemory.single('file'), requirementTemplateController.uploadFile)

export default router
