import { Router } from 'express'
// import protect from '../../middlewares/auth.middleware'
import validateConfirmEmailTokenEndpointBody from '../../middlewares/validation/confirmEmailToken'
import validateLoginEndpointBody from '../../middlewares/validation/login'
import validateResetPasswordEndpointBody from '../../middlewares/validation/resetPassword'
import validateConfirmResetPasswordEndpointBody from '../../middlewares/validation/confirmResetPassword'
import validateSignUpEndpointBody from '../../middlewares/validation/signup'
import validateTokenEndpointBody from '../../middlewares/validation/token'
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
