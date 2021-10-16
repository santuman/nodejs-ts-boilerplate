import keys from '../config/keys'
import { connectMongoDB } from './mongoConnection'

const loader = async () => {
	/**
	 * Database Connection
	 */
	const mongoConnection = await connectMongoDB(keys.MONGO_URI)
}

export default loader
