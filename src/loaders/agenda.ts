import Agenda from 'agenda'

import keys from '../config/keys'

const agendaFactory = () => {
	return new Agenda({
		db: { address: keys.MONGO_URI, collection: keys.AGENDA.DB_COLLECTION },
		processEvery: keys.AGENDA.POOL_TIME,
		maxConcurrency: keys.AGENDA.CONCURRENCY,
	})
}

export default agendaFactory
