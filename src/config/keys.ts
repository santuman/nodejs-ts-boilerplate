import { isEmpty } from '../helpers/isEmpty'

// import dotenv from 'dotenv'
// import path from 'path'

// const envFound = dotenv.config({
// 	path: path.join(path.resolve(), '.env'),
// })

// if (envFound.error) {
// 	throw new Error("⚠️ Couldn't find .env file ⚠️")
// }

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
	MONGO_URI: process.env.MONGO_URI || '',

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
		AGENDA_DB_COLLECTION: process.env.AGENDA_DB_COLLECTION || 'agenda-job-collection-db',
		AGENDA_POOL_TIME: process.env.AGENDA_POOL_TIME || '', // run every
		AGENDA_CONCURRENCY: parseInt(process.env.AGENDA_CONCURRENCY || '10', 10), // max number of jobs at a time
	},

	/**
	 * User by winston logger
	 */
	LOGS: {
		WINSTON_LOG_LEVEL: process.env.WINSTON_LOG_LEVEL || 'silly',
	},

	/**
	 * Nodemailer host credentials
	 */
	EMAIL: {
		EMAIL_FROM: process.env.EMAIL_FROM || '',
		EMAIL_REPLY_TO: process.env.EMAIL_REPLY_TO || '',
		EMAIL_ADMIN_EMAIL_ADDRESS: process.env.EMAIL_ADMIN_EMAIL_ADDRESS || '',
	},

	/**
	 * AWS SES credentials
	 */
	AWS: {
		AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
		AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
	},

	/**
	 * JWT secrets
	 */
	JWT: {
		// ACCESS TOKEN KEYS
		JWT_SECRET_ACCESS_TOKEN: process.env.JWT_SECRET_ACCESS_TOKEN || '',
		JWT_ACCESS_TOKEN_EXPIRY_IN_MINUTES: process.env.JWT_ACCESS_TOKEN_EXPIRY_IN_MINUTES || '',

		// REFRESH TOKEN KEYS
		JWT_SECRET_REFRESH_TOKEN: process.env.JWT_SECRET_REFRESH_TOKEN || '',
		JWT_REFRESH_TOKEN_EXPIRY_IN_MINUTES: process.env.JWT_REFRESH_TOKEN_EXPIRY_IN_MINUTES || '',
	},

	/**
	 * Frontend URL
	 */
	FRONTEND_URL: process.env.FRONTEND_URL || '',
}

// Check if every environment variables are fullfilled
isEmpty(keys)

export default keys
