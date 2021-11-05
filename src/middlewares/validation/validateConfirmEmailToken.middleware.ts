import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import ErrorResponse from '../../utils/errorResponse'

const validateConfirmEmailToken = (req: Request, _res: Response, next: NextFunction) => {
	// Check if proper headers are set or not
	const accessToken = req.headers.authorization?.split(' ')[1]
	if (!accessToken) {
		throw new ErrorResponse(['Bad Request'], 401)
	}

	// Create schema object
	const schema = Joi.object({
		emailToken: Joi.string().required().messages({
			'string.empty': 'Bad Request',
			'any.required': 'Bad Request',
		}),
	})

	// Schema options
	const options = {
		abortEarly: false, // include all errors
		stripUnknown: true, // remove unknown props
	}

	// Validate request body against schema
	const { error, value } = schema.validate(req.body, options)

	// on fail transfer error messages to error Handler
	if (error) {
		const messages = error.details.map((detail) => detail.message)
		return next(new ErrorResponse(messages, 401))
	}

	// on success replace req.body with validated value and trigger next middleware function
	req.body = value
	req.body.accessToken = accessToken
	return next()
}

export default validateConfirmEmailToken
