import dotenv from 'dotenv'
import path from 'path'

const envFound = dotenv.config({
	path: path.join(path.resolve(), '.env'),
})

if (envFound.error) {
	throw new Error("⚠️ Couldn't find .env file ⚠️")
}

const keys = {
	/**
	 * Nodejs environment mode.
	 */
	ENV: process.env.ENV || 'development',

	/**
	 * PORT where server listens for any request.
	 */
	PORT: process.env.PORT || 3000,

	/**
	 * MongoDB Connection URI
	 */
	MONGO_URI: `${process.env.DB_PROTOCOL}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?${process.env.DB_PARAMS}`,

	/**
	 * API configs
	 */
	API: {
		PREFIX: '/api',
	},

	/**
	 * Agenda.js
	 */
	AGENDA: {
		DB_COLLECTION: process.env.AGENDA_DB_COLLECTION || 'agenda-job-collection-db',
		POOL_TIME: process.env.AGENDA_POOL_TIME, // run every
		CONCURRENCY: parseInt(process.env.AGENDA_CONCURRENCY || '10', 10), // max number of jobs at a time
	},

	/**
	 * User by winston logger
	 */
	LOGS: {
		LEVEL: process.env.WINSTON_LOG_LEVEL || 'silly',
	},
}
export default keys
