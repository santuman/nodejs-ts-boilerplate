import { Request, Response, NextFunction } from 'express'
import { Error as MongooseError } from 'mongoose'
import { MongoError } from 'mongodb'
import keys from '../config/keys'
import LoggerInstance from '../loaders/logger'
import ErrorResponse from '../utils/errorResponse'

type CustomErrorTypes = ErrorResponse | MongoError | MongooseError.CastError | MongooseError.ValidationError

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: CustomErrorTypes, _req: Request, res: Response, _next: NextFunction) => {
	console.log('Below is error')
	console.log(err)
	let error = { ...err } as ErrorResponse
	error.messages = (err as ErrorResponse).messages

	// Log to console for development
	if (keys.ENV === 'development') {
		LoggerInstance.error('Error Middleware Stack: %o', err.stack)
	}

	// Mongoose bad ObjectId
	if (err instanceof MongooseError.CastError) {
		const message = 'Resource not found'
		error = new ErrorResponse([message], 404)
	}

	// Mongoose duplicate key MongoError
	if ((err as unknown as MongoError).code === 11000) {
		const message = 'Duplicate field value entered'
		error = new ErrorResponse([message], 400)
	}

	// Mongoose validation error (these validation error comes from mongoose model)
	if (err.name === 'ValidationError') {
		const messages = Object.values((err as MongooseError.ValidationError).errors).map((val) => val.message)
		error = new ErrorResponse(messages, 400)
	}

	console.log('error', error)

	res.status(error.statusCode || 500).json({
		success: false,
		messages: error.messages || 'Server Error',
	})
}
export default errorHandler
