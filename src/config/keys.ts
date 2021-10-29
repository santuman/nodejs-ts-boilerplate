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

	/**
	 * Nodemailer host credentials
	 */
	EMAIL: {
		FROM: process.env.EMAIL_FROM,
		REPLY_TO: process.env.EMAIL_REPLY_TO,
		ADMIN_EMAIL_ADDRESS: process.env.EMAIL_ADMIN_EMAIL_ADDRESS,
	},

	/**
	 * AWS SES credentials
	 */
	AWS: {
		AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
		AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
	},
}
export default keys
