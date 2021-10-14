import keys from '../config/keys'
import { connectMongoDB } from './mongoConnection'

const loader = async () => {
	/**
	 * Database Connection
	 */
	console.log({
		mongoURI: `${keys.DB_PROTOCOL}://${keys.DB_USER}:${keys.DB_PASSWORD}@${keys.DB_HOST}:${keys.DB_PORT}/${keys.DB_NAME}?${keys.DB_PARAMS}`,
	})
	const mongoURI = `${keys.DB_PROTOCOL}://${keys.DB_USER}:${keys.DB_PASSWORD}@${keys.DB_HOST}:${keys.DB_PORT}/${keys.DB_NAME}?${keys.DB_PARAMS}`
	await connectMongoDB(mongoURI)
}

export default loader
