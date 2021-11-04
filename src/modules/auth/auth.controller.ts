import { Request, Response } from 'express'
import Container from 'typedi'
import { IUserInputDTO } from '../../interfaces/IUser'
import { LoggerInstanceType } from '../../loaders/logger'
import { asyncHandler } from '../../middlewares/async.middleware'
import AuthService from './auth.service'

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

	logger.debug('Calling confirm email token endpoint with body: %o', req.body)

	await authServiceInstance.confirmEmailToken(req.body.emailToken, req.body.accessToken)
	return res.status(200).json({
		success: true,
		message: 'Email Confirmed',
	})
})

const authController = {
	signup,
	getAccessToken,
	confirmEmailToken,
}

export default authController
