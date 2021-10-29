import keys from '../config/keys'
import models from '../models'
import dependencyInjectorLoader from './dependencyInjector'
import LoggerInstance from './logger'
import { connectMongoDB } from './mongoConnection'
import jobsLoader from './jobs'

const loader = async () => {
	/**
	 * Database Connection
	 */
	await connectMongoDB(keys.MONGO_URI)

	// It returns the agenda instance because it's needed in the subsequent loaders
	const { agenda } = dependencyInjectorLoader({
		mongoURI: keys.MONGO_URI,
		agendaCollectionName: keys.AGENDA.DB_COLLECTION,
		models,
	})
	LoggerInstance.info('✌️ Dependency Injector loaded')

	await jobsLoader({ agenda })
	LoggerInstance.info('✌️ Jobs loaded')
}

export default loader
