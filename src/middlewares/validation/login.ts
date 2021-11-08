import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'

import ErrorResponse from 'utils/errorResponse'

const validateLoginEndpointBody = (req: Request, _res: Response, next: NextFunction) => {
	// Create schema object
	const schema = Joi.object({
		email: Joi.string().required().trim().min(4).max(25).email().label('Email').messages({
			'string.empty': 'Email should not be empty',
			'any.required': 'Email is required',
			'string.min': 'Email should be atleast 4 characters long',
			'string.max': 'Email should be atmost 25 characters long',
			'string.email': 'Email must be a valid email',
		}),
		password: Joi.string().required().min(6).max(255).label('Password').messages({
			'string.empty': 'Password should not be empty',
			'any.required': 'Password is required',
			'string.min': 'Password should be atleast 6 characters long',
			'string.max': 'Password should be atmost 255 characters long',
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
		return next(new ErrorResponse(messages, 400))
	}

	// on success replace req.body with validated value and trigger next middleware function
	req.body = { ...req.body, ...value }
	return next()
}

export default validateLoginEndpointBody
