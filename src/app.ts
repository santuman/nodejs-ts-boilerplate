import express, { Response } from 'express'
import keys from './config/keys'

import errorHandler from './middlewares/error.middleware'
import authRouter from './modules/auth/auth.routes'

const expressApplication = (): Express.Application => {
	const app = express()

	// Transform the raw string of req.body into json
	app.use(express.json())

	/**
	 * HEALTH CHECK ENDPOINT
	 */
	app.get('/', (_, res: Response) => res.json({ success: true }))

	/**
	 * MOUNT ROUTES
	 */
	app.use(keys.API.PREFIX, authRouter)

	/**
	 * GLOBAL ERROR HANDLER
	 */
	app.use(errorHandler)

	return app
}

export default expressApplication
