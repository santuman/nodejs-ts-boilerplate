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
			from: keys.EMAIL.EMAIL_FROM,
			replyTo: keys.EMAIL.EMAIL_REPLY_TO,
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

	public async SendConfirmationEmail(email: string, emailToken: string) {
		const data = {
			from: `"Account Confirmation" <${keys.EMAIL.EMAIL_FROM}>`,
			replyTo: keys.EMAIL.EMAIL_REPLY_TO,
			to: email,
			subject: 'Confirm Your Email',
			text: `Click the link to confirm your email: ${keys.FRONTEND_URL}/confirm-email/${emailToken}`,
			// html: '<h1>Hi from html</h1>',
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
			from: `"SERVER REPORT" ${keys.EMAIL.EMAIL_FROM}`,
			replyTo: keys.EMAIL.EMAIL_REPLY_TO,
			to: email,
			subject: 'Weekly Report',
			text: 'This is your weekly report admin',
			html: '<h1>Hi Admin</h1>',
		}

		try {
			await this.emailClient.sendMail(data)
			return { delivered: 1, status: 'ok' }
		} catch (error) {
			return { delivered: 0, status: 'error' }
		}
	}
}
