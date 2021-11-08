import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import ErrorResponse from 'utils/errorResponse'

const validateSignUpEndpointBody = (req: Request, _res: Response, next: NextFunction) => {
	// Create schema object
	// https://github.com/sideway/joi/blob/v17.4.0/API.md#list-of-errors
	// https://dev.to/olufemi/validation-joi-brings-you-joy-fof
	const schema = Joi.object({
		userName: Joi.string().required().trim().min(3).max(30).label('User Name').messages({
			// label Overrides the key name in error messages.
			'string.empty': 'First name should not be empty',
			'any.required': 'First name is required',
			'string.min': 'First name should be atleast 3 characters long',
			'string.max': 'First name should be atmost 30 characters long',
		}),
		firstName: Joi.string().required().trim().min(3).max(30).label('First Name').messages({
			'string.empty': 'First name should not be empty',
			'any.required': 'First name is required',
			'string.min': 'First name should be atleast 3 characters long',
			'string.max': 'First name should be atmost 30 characters long',
		}),
		lastName: Joi.string().required().trim().min(3).max(30).label('Last Name').messages({
			'string.empty': 'Last name should not be empty',
			'any.required': 'Last name is required',
			'string.min': 'Last name should be atleast 3 characters long',
			'string.max': 'Last name should be atmost 30 characters long',
		}),
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
		confirmPassword: Joi.string().required().valid(Joi.ref('password')).label('Confirm Password').messages({
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

export default validateSignUpEndpointBody
