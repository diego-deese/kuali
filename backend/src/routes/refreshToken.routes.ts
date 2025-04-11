import { Router } from 'express'
import refreshTokenController from '../controllers/refreshToken.controller'

const router = Router()

router.post('/refreshToken/add', refreshTokenController.addRefreshToken)

router.post('refreshToken/find', refreshTokenController.findRefreshToken)

router.post('refreshToken/revoke', refreshTokenController.revokeTokens)

export default router
