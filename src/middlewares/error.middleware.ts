import { Request, Response, NextFunction } from 'express'
import { Error as MongooseError } from 'mongoose'
import { MongoServerError } from 'mongodb'
import keys from '../config/keys'
import LoggerInstance from '../loaders/logger'
import ErrorResponse from '../utils/errorResponse'

type CustomErrorTypes = ErrorResponse | MongooseError.CastError | MongooseError.ValidationError

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: CustomErrorTypes, _req: Request, res: Response, _next: NextFunction) => {
	let error = { ...err } as ErrorResponse
	error.messages = (err as ErrorResponse).messages

	// Log to console for development
	if (keys.ENV === 'development') {
		LoggerInstance.error('Error Middleware Stack: %o', err.stack)
	}

	if (err.name === 'JsonWebTokenError') {
		const message = 'Bad Token'
		error = new ErrorResponse([message], 401)
	}

	// Mongoose bad ObjectId
	if (err.name === 'CastError') {
		const message = 'Resource not found'
		error = new ErrorResponse([message], 404)
	}

	// Mongoose duplicate key MongoError
	if ((err as unknown as MongoServerError).code === 11000) {
		let message = 'Duplicate field value entered'
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if ((err as any).keyPattern.userName === 1) {
			message = 'User name is already taken'
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} else if ((err as any).keyPattern.email === 1) {
			message = 'Email is already taken'
		}
		error = new ErrorResponse([message], 400)
	}

	// Mongoose validation error (these validation error comes from mongoose model)
	if (err.name === 'ValidationError') {
		const messages = Object.values((err as MongooseError.ValidationError).errors).map((val) => val.message)
		error = new ErrorResponse(messages, 400)
	}

	res.status(error.statusCode || 500).json({
		success: false,
		messages: error.messages || 'Server Error',
	})
}
export default errorHandler
