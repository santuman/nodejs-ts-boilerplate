import { Request, Response } from 'express'
import Container from 'typedi'
import { IUserInputDTO } from '../../interfaces/IUser'
import { LoggerInstanceType } from '../../loaders/logger'
import { asyncHandler } from '../../middlewares/async.middleware'
import AuthService from './auth.service'

const signup = asyncHandler(async (req: Request, res: Response) => {
	console.log('req.body', req.body)
	const authServiceInstance = Container.get(AuthService)
	const logger: LoggerInstanceType = Container.get('logger')
	logger.debug('Calling Sign-Up endpoint with body: %o', req.body)
	const { user, token } = await authServiceInstance.signup(req.body as IUserInputDTO)
	return res.status(201).json({ user, token })
})

const authController = {
	signup,
}

export default authController
