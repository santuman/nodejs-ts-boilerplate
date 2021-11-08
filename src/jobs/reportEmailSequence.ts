import { Job } from 'agenda'
import Container from 'typedi'
import { Logger } from 'winston'
import NodeMailerService from 'services/mailer'

export default class EmailSequenceJob {
	public async handler(job: Job, done: (_arg0?: unknown) => void): Promise<void> {
		const Logger: Logger = Container.get('logger')
		try {
			Logger.debug('✌️ Email Sequence Job triggered!')
			const { email } = job.attrs.data as unknown as { [key: string]: string }
			const mailerServiceInstance = Container.get(NodeMailerService)
			await mailerServiceInstance.SendReportEmail(email)
			done()
		} catch (error) {
			Logger.error('🔥 Error with Email Sequence Job: %o', error)
			done(error)
		}
	}
}
