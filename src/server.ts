import http from 'http'

import keys from './config/keys'
import expressApplication from './app'
import envFileChecker from './utils/envFileChecker'
import { connectMongoDB, disconnectMongoDB } from './database/mongoConnection'
;(async () => {
	try {
		/**
		 * Environment variables file check
		 */
		envFileChecker()

		/**
		 * Database Connection
		 */
		const mongoURI = `${keys.DB_PROTOCOL}://${keys.DB_USER}:${keys.DB_PASSWORD}@${keys.DB_HOST}:${keys.DB_PORT}/${keys.DB_NAME}?${keys.DB_PARAMS}`
		await connectMongoDB(mongoURI)

		/**
		 * Express Application
		 */
		const app = expressApplication()

		/**
		 * HTTP Server
		 */
		const server = http.createServer(app)

		const PORT = keys.PORT
		server.listen(PORT, () => {
			console.log(`Server is running on port ${PORT} in ${keys.ENV} mode`)
		})
	} catch (error) {
		console.log(error)
	}
})()

process.on('SIGINT', async () => {
	await disconnectMongoDB()
	process.exit(0)
})
