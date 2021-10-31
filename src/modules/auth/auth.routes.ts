import { Router } from 'express'
import validateSignUp from '../../middlewares/validateSignUp.middleware'
import authController from './auth.controller'

const authRouter = Router()

authRouter.post('/signup', validateSignUp, authController.signup)

export default authRouter
