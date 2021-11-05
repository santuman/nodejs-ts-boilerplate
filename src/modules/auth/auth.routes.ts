import { Router } from 'express'
import protect from '../../middlewares/auth.middleware'
import validateConfirmEmailTokenEndpointBody from '../../middlewares/validation/confirmEmailToken.middleware'
import validateSignUpEndpointBody from '../../middlewares/validation/signup'
import validateTokenEndpointBody from '../../middlewares/validation/token'
import authController from './auth.controller'

const authRouter = Router()

// Global
authRouter.post('/auth/signup', validateSignUpEndpointBody, authController.signup)
authRouter.post('/auth/token', validateTokenEndpointBody, authController.getAccessToken)

// Protected
authRouter.post('/auth/confirmEmailToken', protect, validateConfirmEmailTokenEndpointBody, authController.confirmEmailToken)

export default authRouter
