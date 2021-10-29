import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses'
import nodemailer from 'nodemailer'
import { Container } from 'typedi'
import keys from '../config/keys'
import { Models } from '../models'
import agendaFactory from './agenda'
import LoggerInstance from './logger'

interface DependencyInjectorLoaderParams {
	mongoURI: string
	agendaCollectionName: string
	models: Models
}

const {
	AWS: { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY },
} = keys

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
	throw new Error('AWS SES credentials is not fullfilled')
}

const ses = new SESClient({
	apiVersion: '2010-12-01',
	region: 'ap-south-1',
	credentials: {
		accessKeyId: AWS_ACCESS_KEY_ID,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
	},
})

const dependencyInjectorLoader = ({ mongoURI, agendaCollectionName, models }: DependencyInjectorLoaderParams) => {
	try {
		/**
		 * Injecting models
		 */
		models.forEach((model) => {
			Container.set(model.name, model.model)
		})

		const agendaInstance = agendaFactory({ mongoURI, collectionName: agendaCollectionName })

		Container.set('agendaInstance', agendaInstance)
		LoggerInstance.info('✌️ Agenda injected into container')

		Container.set('logger', LoggerInstance)
		LoggerInstance.info('✌️ Logger injected into container')

		Container.set(
			'emailClient',
			nodemailer.createTransport({
				SES: { ses, aws: { SendRawEmailCommand } },
			})
		)
		LoggerInstance.info('✌️ EmailClient injected into container')

		return { agenda: agendaInstance }
	} catch (error) {
		LoggerInstance.error('🔥 Error on dependency injector loader: %o', error) // string interpolation splat()
		throw error
	}
}

export default dependencyInjectorLoader
