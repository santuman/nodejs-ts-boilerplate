import 'reflect-metadata'
import express, { Request, Response } from 'express'

const expressApplication = (): Express.Application => {
	const app = express()

	app.get('/', (_: Request, res: Response) => {
		res.json({
			success: true,
		})
	})

	return app
}

export default expressApplication
