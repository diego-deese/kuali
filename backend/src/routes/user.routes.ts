import { Router } from 'express'
import userController from '../controllers/user.controller'

const router = Router()

router.get('/', userController.getUsers) // Add middleware
router.get('/:id', userController.getUser) // Add middleware

router.post('/', userController.createUser) // Add middleware

router.put('/:id', userController.updateUser) // Add middleware

router.patch('/:id/password', userController.updatePasswordWithValidation) // Add middleware

router.delete('/:id', userController.deleteUser) // Add middleware

export default router
