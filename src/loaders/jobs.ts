import Agenda from 'agenda'
import keys from 'config/keys'
import EmailSequenceJob from 'jobs/reportEmailSequence'

export default async ({ agenda }: { agenda: Agenda }) => {
	agenda.define(
		'send-report-email',
		{
			priority: 20,
			concurrency: keys.AGENDA.AGENDA_CONCURRENCY,
		},
		new EmailSequenceJob().handler
	)
	await agenda.start()
	// await agenda.every('0 22 * * 0', 'send-report-email') // At 10:00 PM, only on Sunday https://crontab.cronhub.io/
	// await agenda.every('*/1 * * * *', 'send-report-email', { // Every minute
	await agenda.every('0 22 * * 0', 'send-report-email', {
		email: keys.EMAIL.EMAIL_ADMIN_EMAIL_ADDRESS,
	}) // At 10:00 PM, only on Sunday https://crontab.cronhub.io/
}
