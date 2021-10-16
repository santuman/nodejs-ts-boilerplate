import http from 'http'

import keys from './config/keys'
import expressApplication from './app'
import { disconnectMongoDB } from './loaders/mongoConnection'
import Logger from './loaders/logger'
import loader from './loaders'

const startServer = async () => {
	try {
		/**
		 * Loads everything
		 */
		await loader()
		/**
		 * Express Application
		 */
		const app = expressApplication()

		/**
		 * HTTP Server
		 */
		const server = http.createServer(app)

		server.listen(keys.PORT, () => {
			Logger.info(`
                #############################################
                🛡️  Server listening on port: ${keys.PORT} 🛡️
                #############################################
            `)
		})
	} catch (error) {
		Logger.error(error)
		process.exit(1)
	}
}

startServer()

process.on('SIGINT', async () => {
	await disconnectMongoDB()
	process.exit(0)
})
