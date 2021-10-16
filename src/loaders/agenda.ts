import Agenda from 'agenda'

import keys from '../config/keys'

interface AgendaFactoryParams {
	mongoURI: string
	collectionName: string
}

const agendaFactory = ({ mongoURI, collectionName }: AgendaFactoryParams) => {
	return new Agenda({
		db: { address: mongoURI, collection: collectionName },
		processEvery: keys.AGENDA.POOL_TIME,
		maxConcurrency: keys.AGENDA.CONCURRENCY,
	})
}

export default agendaFactory
