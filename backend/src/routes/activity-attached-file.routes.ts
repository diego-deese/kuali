import { Router } from 'express'
import { uploadMemory } from '../middlewares/upload-files.middleware'
import { isAuthenticated } from '../middlewares/jwt.middleware'
import activityAttachedFileController from '../controllers/activity-attached-file.controller'
import { isAdmin } from '../middlewares/role.middleware'

const router = Router()

router.get('/download/:fileId', isAuthenticated, activityAttachedFileController.downloadFile)

router.post('/upload/:activityId', isAuthenticated, isAdmin, uploadMemory.single('file'), activityAttachedFileController.uploadFile)

export default router
