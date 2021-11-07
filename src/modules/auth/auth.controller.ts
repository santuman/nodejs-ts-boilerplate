import { Request, Response } from 'express'
import Container from 'typedi'
import { IUserInputDTO } from '../../interfaces/IUser'
import { LoggerInstanceType } from '../../loaders/logger'
import { asyncHandler } from '../../middlewares/async.middleware'
import AuthService from './auth.service'

const login = asyncHandler(async (req: Request, res: Response) => {
	const authServiceInstance = Container.get(AuthService)
	const logger: LoggerInstanceType = Container.get('logger')

	logger.debug('Calling Login endpoint with body: %o', req.body)

	const { email, password } = req.body

	const { user, accessToken, refreshToken } = await authServiceInstance.login(email, password)
	return res.status(200).json({ success: true, message: 'Login successful', user, accessToken, refreshToken })
})

const signup = asyncHandler(async (req: Request, res: Response) => {
	const authServiceInstance = Container.get(AuthService)
	const logger: LoggerInstanceType = Container.get('logger')

	logger.debug('Calling Sign-Up endpoint with body: %o', req.body)

	const { user, accessToken, refreshToken } = await authServiceInstance.signup(req.body as IUserInputDTO)
	return res.status(201).json({ success: true, message: 'Sign up successful', user, accessToken, refreshToken })
})

const getAccessToken = asyncHandler(async (req: Request, res: Response) => {
	const authServiceInstance = Container.get(AuthService)
	const logger: LoggerInstanceType = Container.get('logger')

	logger.debug('Calling token endpoint with body: %o', req.body)

	const { accessToken } = await authServiceInstance.getAccessToken(req.body.refreshToken)
	return res.status(200).json({
		success: true,
		message: 'Access Token generated',
		accessToken,
	})
})

const confirmEmailToken = asyncHandler(async (req: Request, res: Response) => {
	const authServiceInstance = Container.get(AuthService)
	const logger: LoggerInstanceType = Container.get('logger')

	logger.debug('Calling Confirm Email Token endpoint with body: %o', req.body)

	await authServiceInstance.confirmEmailToken(req.body.emailToken, req.body.userId)
	return res.status(200).json({
		success: true,
		message: 'Email Confirmed',
	})
})

const resetPassword = asyncHandler(async (req: Request, res: Response) => {
	const authServiceInstance = Container.get(AuthService)
	const logger: LoggerInstanceType = Container.get('logger')

	logger.debug('Calling Reset Password endpoint with body: %o', req.body)

	await authServiceInstance.resetPassword(req.body.userId, req.body.provisionalPassword)
	return res.status(200).json({
		success: true,
		message: 'Password Reset Email Sent',
	})
})

const confirmResetPassword = asyncHandler(async (req: Request, res: Response) => {
	const authServiceInstance = Container.get(AuthService)
	const logger: LoggerInstanceType = Container.get('logger')

	logger.debug('Calling Confirm Reset Password endpoint with body: %o', req.body)

	await authServiceInstance.confirmResetPassword(req.body.userId, req.body.passwordResetToken)
	return res.status(200).json({
		success: true,
		message: 'Password Reset Success',
	})
})

const authController = {
	login,
	signup,
	getAccessToken,
	confirmEmailToken,
	resetPassword,
	confirmResetPassword,
}

export default authController
