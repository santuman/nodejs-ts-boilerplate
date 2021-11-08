import { Service, Inject } from 'typedi'
import { Transporter } from 'nodemailer'
import SESTransport from 'nodemailer/lib/ses-transport'

import keys from 'config/keys'

@Service()
export default class NodeMailerService {
	constructor(@Inject('emailClient') private emailClient: Transporter<SESTransport.SentMessageInfo>) {}

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

	public async SendConfirmationEmail(email: string, emailToken: string, userId: string) {
		const data = {
			from: `"Account Confirmation" <${keys.EMAIL.EMAIL_FROM}>`,
			replyTo: keys.EMAIL.EMAIL_REPLY_TO,
			to: email,
			subject: 'Confirm Your Email',
			text: `Click the link to confirm your email: ${keys.FRONTEND_URL}/confirm-email/${userId}/${emailToken}`,
			// html: '<h1>Hi from html</h1>',
		}

		try {
			await this.emailClient.sendMail(data)
			return { delivered: 1, status: 'ok' }
		} catch (error) {
			return { delivered: 0, status: 'error' }
		}
	}

	public async SendPasswordResetConfirmationEmail(email: string, userId: string, passwordResetToken: string) {
		const data = {
			from: `"Reset Your Password" <${keys.EMAIL.EMAIL_FROM}>`,
			replyTo: keys.EMAIL.EMAIL_REPLY_TO,
			to: email,
			subject: 'Confirm Your Email',
			text: `Click the link to confirm your password reset: ${keys.FRONTEND_URL}/confirm-password/${userId}/${passwordResetToken}`,
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
