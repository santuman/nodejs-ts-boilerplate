import { Router } from 'express'
import validateConfirmEmailTokenEndpointBody from '../../middlewares/validation/confirmEmailToken.middleware'
import validateSignUpEndpointBody from '../../middlewares/validation/signup'
import validateTokenEndpointBody from '../../middlewares/validation/token'
import authController from './auth.controller'

const authRouter = Router()

authRouter.post('/auth/signup', validateSignUpEndpointBody, authController.signup)
authRouter.post('/auth/token', validateTokenEndpointBody, authController.getAccessToken)
authRouter.post('/auth/confirmEmailToken', validateConfirmEmailTokenEndpointBody, authController.confirmEmailToken)

export default authRouter
