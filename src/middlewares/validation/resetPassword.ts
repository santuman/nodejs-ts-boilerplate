import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import ErrorResponse from '../../utils/errorResponse'

const validateResetPasswordEndpointBody = (req: Request, _res: Response, next: NextFunction) => {
	// Create schema object
	const schema = Joi.object({
		provisionalPassword: Joi.string().required().min(6).max(255).messages({
			'string.empty': 'provisionalPassword should not be empty',
			'any.required': 'provisionalPassword is required',
			'string.min': 'provisionalPassword should be atleast 6 characters long',
			'string.max': 'provisionalPassword should be atmost 255 characters long',
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
	req.body = { ...req.body, ...value }
	return next()
}

export default validateResetPasswordEndpointBody
