import { Router } from 'express'
import { isAuthenticated } from '../middlewares/jwt.middleware'
import { isAdmin } from '../middlewares/role.middleware'
import academicProgramController from '../controllers/academic-program.controller'

const router = Router()

router.get('/', isAuthenticated, isAdmin, academicProgramController.getAcademicPrograms)
router.post('/', isAuthenticated, isAdmin, academicProgramController.createAcademicProgram)

router.patch('/:academicProgramId/assign-researcher', isAuthenticated, isAdmin, academicProgramController.assignResearcher)

router.patch('/:academicProgramId/unassign-researcher', isAuthenticated, isAdmin, academicProgramController.unassignResearcher)

router.delete('/:academicProgramId', isAuthenticated, isAdmin, academicProgramController.deleteAcademicProgram)
router.patch('/:academicProgramId', isAuthenticated, isAdmin, academicProgramController.renameAcademicProgram)

export default router
