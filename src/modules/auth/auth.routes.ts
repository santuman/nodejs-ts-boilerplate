import { Router } from 'express'
import validateConfirmEmailToken from '../../middlewares/validation/validateConfirmEmailToken.middleware'
import validateSignUp from '../../middlewares/validation/validateSignUp.middleware'
import validateTokenEndpointBody from '../../middlewares/validation/validateToken.middleware'
import authController from './auth.controller'

const authRouter = Router()

authRouter.post('/auth/signup', validateSignUp, authController.signup)
authRouter.post('/auth/token', validateTokenEndpointBody, authController.getAccessToken)
authRouter.post('/auth/confirmEmailToken', validateConfirmEmailToken, authController.confirmEmailToken)

export default authRouter
