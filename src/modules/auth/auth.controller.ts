import Container from 'typedi'
import { Request, Response } from 'express'

import AuthService from './auth.service'
import { IUserInputDTO } from 'interfaces/IUser'
import { LoggerInstanceType } from 'loaders/logger'
import { asyncHandler } from 'middlewares/async.middleware'

/**
 * @desc Login user
 * @route POST /api/auth/login
 * @access Public
 */
const login = asyncHandler(async (req: Request, res: Response) => {
	const authServiceInstance = Container.get(AuthService)
	const logger: LoggerInstanceType = Container.get('logger')

	logger.debug('Calling Login endpoint with body: %o', req.body)

	const { email, password } = req.body

	const { user, accessToken, refreshToken } = await authServiceInstance.login(email, password)
	return res.status(200).json({ success: true, message: 'Login successful', user, accessToken, refreshToken })
})

/**
 * @desc Register user
 * @route POST /api/auth/signup
 * @access Public
 */
const signup = asyncHandler(async (req: Request, res: Response) => {
	const authServiceInstance = Container.get(AuthService)
	const logger: LoggerInstanceType = Container.get('logger')

	logger.debug('Calling Sign-Up endpoint with body: %o', req.body)

	await authServiceInstance.signup(req.body as IUserInputDTO)
	return res.status(201).json({ success: true, message: 'Sign up successful. Please Confirm Your Email' })
})

/**
 * @desc Get New Access token
 * @route POST /api/auth/token
 * @access Public
 */
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

/**
 * @desc Confirm Email Address
 * @route POST /api/auth/confirmEmailToken
 * @access Public
 */
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

/**
 * @desc Password Reset
 * @route POST /api/auth/resetPassword
 * @access Public
 */
const resetPassword = asyncHandler(async (req: Request, res: Response) => {
	const authServiceInstance = Container.get(AuthService)
	const logger: LoggerInstanceType = Container.get('logger')

	logger.debug('Calling Reset Password endpoint with body: %o', req.body)

	await authServiceInstance.resetPassword(req.body.email)
	return res.status(200).json({
		success: true,
		message: 'Password Reset Email Sent',
	})
})

/**
 * @desc  Confirm New Password
 * @route POST /api/auth/confirmResetPassword
 * @access Public
 */
const confirmResetPassword = asyncHandler(async (req: Request, res: Response) => {
	const authServiceInstance = Container.get(AuthService)
	const logger: LoggerInstanceType = Container.get('logger')

	logger.debug('Calling Confirm Reset Password endpoint with body: %o', req.body)

	await authServiceInstance.confirmResetPassword(req.body.userId, req.body.password, req.body.passwordResetToken)
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
