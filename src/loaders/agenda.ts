import Agenda from 'agenda'

import keys from 'config/keys'

interface AgendaFactoryParams {
	mongoURI: string
	collectionName: string
}

const agendaFactory = ({ mongoURI, collectionName }: AgendaFactoryParams) => {
	return new Agenda({
		db: { address: mongoURI, collection: collectionName },
		processEvery: keys.AGENDA.AGENDA_POOL_TIME,
		maxConcurrency: keys.AGENDA.AGENDA_CONCURRENCY,
	})
}

export default agendaFactory
