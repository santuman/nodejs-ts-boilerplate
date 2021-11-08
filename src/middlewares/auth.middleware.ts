import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import keys from 'config/keys'
import { IUser } from 'interfaces/IUser'
import ErrorResponse from 'utils/errorResponse'
import { asyncHandler } from './async.middleware'

const protect = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
	let accessToken

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		// Set accessToken from Bearer accessToken
		accessToken = req.headers.authorization.split(' ')[1]
	}

	// Set accessToken from cookie
	// else if (req.cookies.accessToken){
	// accessToken = req.cookies.accessToken
	// }

	// Make sure accessToken exists
	if (!accessToken) {
		return next(new ErrorResponse(['Not Authorized'], 401))
	}

	// Verify token
	const decodedAccessToken = jwt.verify(accessToken, keys.JWT.JWT_SECRET_ACCESS_TOKEN)
	req.body.userId = (decodedAccessToken as IUser)._id
	next()
})

export default protect
