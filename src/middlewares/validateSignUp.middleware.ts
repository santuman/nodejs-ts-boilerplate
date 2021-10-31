import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import ErrorResponse from '../utils/errorResponse'

const validateSignUp = (req: Request, _res: Response, next: NextFunction) => {
	console.log('validating')
	// Create schema object
	// https://github.com/sideway/joi/blob/v17.4.0/API.md#list-of-errors
	//https://dev.to/olufemi/validation-joi-brings-you-joy-fof
	const schema = Joi.object({
		userName: Joi.string().alphanum().min(3).max(30).required().label('User Name'), // label Overrides the key name in error messages.
		firstName: Joi.string().alphanum().min(3).max(30).required().label('First Name'),
		lastName: Joi.string().alphanum().min(3).max(30).required().label('Last Name'),
		email: Joi.string().email().required().label('Email'),
		password: Joi.string().min(6).required().label('Password'),
		confirmPassword: Joi.string().valid(Joi.ref('password')).required().label('Confirm Password').messages({
			'string.empty': 'Confirm Password should not be empty',
			'any.required': 'Confirm Password is required',
			'any.only': 'Password and Confirm Password did not matched',
		}),
	})

	// Schema options
	const options = {
		abortEarly: false, // include all errors
		stripUnknown: true, // remove unknown props
	}

	// Validate request body against schema
	console.log('req.body', req.body)
	const { error, value } = schema.validate(req.body, options)

	// on fail transfer error messages to error Handler
	if (error) {
		const messages = error.details.map((detail) => detail.message)
		console.log(messages)
		return next(new ErrorResponse(messages, 400))
	}

	// on success replace req.body with validated value and trigger next middleware function
	req.body = value
	return next()
}

export default validateSignUp
