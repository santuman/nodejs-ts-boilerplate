import { Transporter } from 'nodemailer'
import SESTransport from 'nodemailer/lib/ses-transport'
import { Service, Inject } from 'typedi'
import keys from '../config/keys'

@Service()
export default class NodeMailerService {
	// emailClient: Transporter<SESTransport.SentMessageInfo>
	constructor(@Inject('emailClient') private emailClient: Transporter<SESTransport.SentMessageInfo>) {
		// this.emailClient = emailClient
	}

	public async SendWelcomeEmail(email: string) {
		const data = {
			from: keys.EMAIL.FROM,
			replyTo: keys.EMAIL.REPLY_TO,
			to: email,
			subject: 'Hello',
			text: 'Testing from nodejs boilerplate',
			html: '<h1>Hi from html</h1>',
		}

		try {
			await this.emailClient.sendMail(data)
			return { delivered: 1, status: 'ok' }
		} catch (error) {
			return { delivered: 0, status: 'error' }
		}
	}

	public async SendReportEmail(email: string) {
		const data = {
			from: `"SERVER REPORT" ${keys.EMAIL.FROM}`,
			replyTo: keys.EMAIL.REPLY_TO,
			to: email,
			subject: 'Weekly Report',
			text: 'This is your weekly report admin',
			html: '<h1>Hi Admin</h1>',
		}

		try {
			await this.emailClient.sendMail(data)
			console.log('Email sent')
			return { delivered: 1, status: 'ok' }
		} catch (error) {
			console.log(error)
			return { delivered: 0, status: 'error' }
		}
	}
}
