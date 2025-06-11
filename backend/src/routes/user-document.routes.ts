import { Router } from 'express'
import { isAdmin } from '../middlewares/role.middleware'
import { isAuthenticated } from '../middlewares/jwt.middleware'
import userDocumentController from '../controllers/user-document.controller'
import { uploadMemory } from '../middlewares/upload-files.middleware'

const router = Router()

router.get('/download/:userDocumentId', isAuthenticated, isAdmin, userDocumentController.downloadUserDocument)

router.get('/requirement/:requirementId/download', isAuthenticated, isAdmin, userDocumentController.downloadUserDocumentsByRequirement)

router.get('/user/:userId/activity/:activityId/download', isAuthenticated, isAdmin, userDocumentController.downloadUserDocumentsByUser)

router.post('/upload', isAuthenticated, uploadMemory.single('file'), userDocumentController.uploadUserDocument)

router.get('/activity/:activityId', isAuthenticated, isAdmin, userDocumentController.getActivityUserDocuments)

router.patch('/:userDocumentId', isAuthenticated, uploadMemory.single('file'), userDocumentController.updateUserDocument)
router.delete('/:userDocumentId', isAuthenticated, userDocumentController.deleteUserDocument)

router.patch('/:userDocumentId/approve', isAuthenticated, isAdmin, userDocumentController.approveDocument)

router.patch('/:userDocumentId/reject', isAuthenticated, isAdmin, userDocumentController.rejectDocument)

export default router
