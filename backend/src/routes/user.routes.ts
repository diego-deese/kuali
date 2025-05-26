import { Router } from 'express'
import userController from '../controllers/user.controller'
import { isAuthenticated } from '../middlewares/jwt.middleware'
import { isAdmin, isResearcher } from '../middlewares/role.middleware'

const router = Router()

router.get('/', isAuthenticated, isAdmin, userController.getUsers)
router.post('/', isAuthenticated, isAdmin, userController.createUser)

router.get('/students', isAuthenticated, isResearcher, userController.getResearcherStudentsWithAcademicProgram)
router.put('/students/:id', isAuthenticated, userController.toggleStudentState)

router.get('/:id', isAuthenticated, userController.getUser)
router.put('/:id', isAuthenticated, isAdmin, userController.updateUser)
router.delete('/:id', isAuthenticated, isAdmin, userController.deleteUser)

router.get('/:id/profilePhoto', userController.getUserProfilePhoto)

router.patch('/:id/password', isAuthenticated, userController.updatePasswordWithValidation)

export default router
