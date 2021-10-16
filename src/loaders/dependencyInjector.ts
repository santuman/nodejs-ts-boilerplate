import { Container } from 'typedi'
import { Models } from '../models'
import agendaFactory from './agenda'
import LoggerInstance from './logger'

interface DependencyInjectorLoaderParams {
	mongoURI: string
	agendaCollectionName: string
	models: Models
}
const dependencyInjectorLoader = ({ mongoURI, agendaCollectionName, models }: DependencyInjectorLoaderParams) => {
	try {
		models.forEach((model) => {
			Container.set(model.name, model.model)
		})

		const agendaInstance = agendaFactory({ mongoURI, collectionName: agendaCollectionName })

		Container.set('agendaInstance', agendaInstance)
		Container.set('logger', LoggerInstance)

		LoggerInstance.info('✌️ Agenda injected into container')

		return { agenda: agendaInstance }
	} catch (error) {
		LoggerInstance.error('🔥 Error on dependency injector loader: %o', error) // string interpolation splat()
		throw error
	}
}

export default dependencyInjectorLoader
