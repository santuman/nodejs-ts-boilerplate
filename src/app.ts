import express, { Response } from 'express'

import errorHandler from './middlewares/error.middleware'
import authRouter from './modules/auth/auth.routes'

const expressApplication = (): Express.Application => {
	const app = express()

	// JSON parser
	app.use(express.json())

	// Test route
	app.get('/', (_, res: Response) => res.json({ success: true }))

	// Auth routes
	app.use('/api/v1/auth', authRouter)

	// Error Handler
	app.use(errorHandler)

	return app
}

export default expressApplication
