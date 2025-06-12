import { Router } from 'express'
import userController from '../controllers/user.controller'
import { isAuthenticated } from '../middlewares/jwt.middleware'
import { isAdmin, isResearcher } from '../middlewares/role.middleware'
import { uploadMemory } from '../middlewares/upload-files.middleware'

const router = Router()

router.get('/', isAuthenticated, isAdmin, userController.getUsers)
router.post('/', isAuthenticated, isAdmin, uploadMemory.single('profile_photo'), userController.createUser)

router.get('/researcher/students', isAuthenticated, isResearcher, userController.getResearcherStudentsWithAcademicProgram)
router.post('/students', isAuthenticated, userController.assignStudent)

router.get('/:id', isAuthenticated, userController.getUser)
router.put('/:id', isAuthenticated, isAdmin, uploadMemory.single('profile_photo'), userController.updateUser)

router.delete('/:id', isAuthenticated, isAdmin, userController.deleteUser)
router.delete('/Admin/:id', isAuthenticated, isAdmin, userController.deleteAdmin)

router.patch('/:id/deactivate', isAuthenticated, userController.deactivateUser)

router.get('/:id/profilePhoto', userController.getUserProfilePhoto)

router.patch('/:id/password', isAuthenticated, userController.updatePasswordWithValidation)

export default router
