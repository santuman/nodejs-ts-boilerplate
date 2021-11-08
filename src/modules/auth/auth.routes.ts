import { Router } from 'express'
import {
	validateConfirmEmailTokenEndpointBody,
	validateConfirmResetPasswordEndpointBody,
	validateLoginEndpointBody,
	validateResetPasswordEndpointBody,
	validateSignUpEndpointBody,
	validateTokenEndpointBody,
} from 'middlewares/validation'
// import protect from 'middlewares/auth.middleware'

import authController from './auth.controller'

const authRouter = Router()

// Global
authRouter.post('/auth/login', validateLoginEndpointBody, authController.login)
authRouter.post('/auth/signup', validateSignUpEndpointBody, authController.signup)
authRouter.post('/auth/token', validateTokenEndpointBody, authController.getAccessToken)
authRouter.post('/auth/confirmEmailToken', validateConfirmEmailTokenEndpointBody, authController.confirmEmailToken)
authRouter.post('/auth/resetPassword', validateResetPasswordEndpointBody, authController.resetPassword)
authRouter.post('/auth/confirmResetPassword', validateConfirmResetPasswordEndpointBody, authController.confirmResetPassword)

export default authRouter
