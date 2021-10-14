import dotenv from 'dotenv'
import path from 'path'

const envFound = dotenv.config({
	path: path.join(path.resolve(), '.env'),
})

if (envFound.error) {
	throw new Error('⚠️ Couldn\'t find .env file ⚠️')
}

const keys = {
	/**
	 * Nodejs environment mode.
	 */
	ENV: process.env.ENV,

	/**
	 * PORT where server listens for any request.
	 */
	PORT: process.env.PORT,

	/**
	 * MongoDB connection Username
	 */
	DB_USER: process.env.DB_USER,

	/**
	 * MongoDB connection Password
	 */
	DB_PASSWORD: process.env.DB_PASSWORD,

	/**
	 * MongoDB connection Host
	 */
	DB_HOST: process.env.DB_HOST,

	/**
	 * MongoDB connection Port Number
	 */
	DB_PORT: process.env.DB_PORT,

	/**
	 * MongoDB connection Protocol
	 */
	DB_PROTOCOL: process.env.DB_PROTOCOL,

	/**
	 * MongoDB Database Name
	 */
	DB_NAME: process.env.DB_NAME,

	/**
	 * MongoDB connection uri params
	 */
	DB_PARAMS: process.env.DB_PARAMS,

	/**
	 * API configs
	 */
	API: {
		PREFIX: '/api',
	},

	/**
	 * User by winston logger
	 */
	LOGS: {
		LEVEL: process.env.WINSTON_LOG_LEVEL || 'silly',
	},
}
export default keys
