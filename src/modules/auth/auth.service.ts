import { Inject, Service } from 'typedi'
import { randomBytes } from 'crypto'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { IUser, IUserInputDTO } from '../../interfaces/IUser'
import { LoggerInstanceType } from '../../loaders/logger'
import { UserModelType } from '../../models/user.model'
import NodeMailerService from '../../services/mailer'
import { v4 as uuidv4 } from 'uuid'
import keys from '../../config/keys'
import { GenerateTokenParams } from '../../interfaces/GenerateTokenParams'
import ErrorResponse from '../../utils/errorResponse'

@Service()
export default class AuthService {
	constructor(
		@Inject('userModel') private userModel: UserModelType,
		private mailer: NodeMailerService,
		@Inject('logger') private logger: LoggerInstanceType
	) {}

	public async signup(userInputDto: IUserInputDTO) {
		const salt = randomBytes(20)

		this.logger.silly('Hashing password')
		const hashedPassword = await argon2.hash(userInputDto.password, { salt })

		this.logger.silly('Creating user db record')
		const userRecord = await this.userModel.create({
			...userInputDto,
			emailToken: uuidv4(),
			security: {
				salt: salt.toString('hex'),
				tokens: [],
			},
			password: hashedPassword,
		})

		if (!userRecord) {
			throw new Error('User cannot be created')
		}

		this.logger.silly('Sending confirmation email')
		await this.mailer.SendConfirmationEmail(userRecord.email, userRecord.emailToken, userRecord._id)
	}

	public async login(email: string, password: string) {
		const userRecord = await this.userModel.findByEmail(email)

		// Check if the email is correct / user exists or not
		if (!userRecord) throw new ErrorResponse(['User not registered'], 400)

		// Check if email is verified or not
		if (!userRecord.emailConfirmed) throw new ErrorResponse(['Please Confirm Your Email'], 401)

		// Using verify from argon2 to prevent 'timing based' attacks
		this.logger.silly('Checking password')
		const validPassword = await argon2.verify(userRecord.password, password)

		if (!validPassword) throw new ErrorResponse(['Invalid Password'], 401)

		this.logger.silly('Password is valid')
		this.logger.silly('Generating ACCESS JWT Token')
		const accessToken = this.generateToken({
			type: 'ACCESS',
			user: userRecord,
		})

		this.logger.silly('Generating REFRESH JWT Token')
		const refreshToken = this.generateToken({
			type: 'REFRESH',
			user: userRecord,
		})

		this.logger.silly(`Updating refreshToken of user with id ${userRecord._id}`)
		await this.addRefreshToken(userRecord, refreshToken)

		const user = userRecord.toObject()

		return { user, accessToken, refreshToken }
	}

	public async getAccessToken(refreshToken: string) {
		// Verify if the token is valid - if not, jwt.verify will throw error which will be catch by asyncHandler in controller
		const decodedRefreshToken = jwt.verify(refreshToken, keys.JWT.JWT_SECRET_REFRESH_TOKEN)
		const user = await this.userModel.findByEmail((decodedRefreshToken as IUser).email)
		if (!user) {
			throw new ErrorResponse(['Invalid Refresh Token'], 401)
		}
		const existingRefreshTokens = user.security.tokens

		// Check if refresh token is in document
		if (existingRefreshTokens.some((token) => token.refreshToken === refreshToken)) {
			// Generate new Access token
			const token = this.generateToken({ type: 'ACCESS', user })

			return { accessToken: token }
		} else {
			throw new ErrorResponse(['Invalid Refresh Token'], 401)
		}
	}

	public async confirmEmailToken(emailToken: string, userId: string) {
		// Check if user exists | user may have deleted their account
		const user = await this.userModel.findById(userId)
		if (!user) throw new ErrorResponse(['Bad Request'], 401)

		// Check if email is already confirmed
		if (user.emailConfirmed) throw new ErrorResponse(['Email is already confirmed'], 401)

		// Check if provided email token matches user's email
		if (emailToken !== user.emailToken) {
			throw new ErrorResponse(['Invalid Email token'], 401)
		}
		await this.userModel.updateEmailToken(user._id)
	}

	public async resetPassword(email: string) {
		// Check if user exists | user may have deleted their account
		const user = await this.userModel.findByEmail(email)
		if (!user) throw new ErrorResponse(['Bad Request'], 401)

		// Generate a password reset token
		this.logger.silly('Generating password reset token')
		const passwordResetToken = uuidv4()
		const expiresIn = new Date(new Date().setMinutes(new Date().getMinutes() + 10)) // 10 minutes of expiry date

		// Update user with password token
		await this.userModel.updatePasswordReset(user._id, {
			token: passwordResetToken,
			expiry: expiresIn,
		})

		const res = await this.mailer.SendPasswordResetConfirmationEmail(user.email, user._id, passwordResetToken)

		if (res.status !== 'ok') {
			throw new ErrorResponse(['Server Error'], 500)
		}
	}

	public async confirmResetPassword(userId: string, password: string, passwordResetToken: string) {
		const user = (await this.userModel.findById(userId)) as IUser

		// Check if supplied passwordResetToken matches with the user's stored one
		if (user.security.passwordReset.token !== passwordResetToken) throw new ErrorResponse(['Invalid token'], 401)

		// Check if password reset token is expired
		if (new Date() > user.security.passwordReset.expiry) {
			// Good secuirty practice to clear passwordReset field if passwordReset expires
			await this.userModel.clearPasswordReset(user._id)
			throw new ErrorResponse(['Password Reset Token Expired'], 401)
		}

		const salt = randomBytes(20)

		this.logger.silly('Hashing password')
		const hashedPassword = await argon2.hash(password, { salt })

		await this.userModel.updatePassword(user._id, hashedPassword)
	}

	private async addRefreshToken(user: IUser, refreshToken: string): Promise<boolean> {
		try {
			const existingRefreshTokens = user.security.tokens

			if (existingRefreshTokens.length === 25) {
				// Remove the oldest token
				const lastRefreshTokenId = existingRefreshTokens[0]._id
				await this.userModel.removeRefreshToken(user._id, lastRefreshTokenId)
			}

			// Push the new token
			await this.userModel.pushRefreshTokens(user._id, {
				token: refreshToken,
				createdAt: new Date(),
			})

			return true
		} catch (error) {
			return false
		}
	}

	/**
	 * Generates Access or Refresh token based on @param
	 * @param __params An object with the options for the generateToken method to work
	 * @returns token generated
	 */
	private generateToken(params: GenerateTokenParams): string {
		const { type, user } = params
		const today = new Date()
		const exp = new Date(today)

		// By default access token keys are used for access token
		let secretToken = keys.JWT.JWT_SECRET_ACCESS_TOKEN
		let expiryInMinutes = keys.JWT.JWT_ACCESS_TOKEN_EXPIRY_IN_MINUTES

		if (type === 'REFRESH') {
			secretToken = keys.JWT.JWT_SECRET_REFRESH_TOKEN
			expiryInMinutes = keys.JWT.JWT_REFRESH_TOKEN_EXPIRY_IN_MINUTES
		}
		// exp.setDate(today.getDate() + 60) // expires in 60 days
		exp.setMinutes(today.getMinutes() + +expiryInMinutes)

		this.logger.silly(`Sign JWT ${type} token for userId: ${user._id}`)
		return jwt.sign(
			{
				_id: user._id,
				role: user.role,
				userName: user.userName,
				email: user.email,
				exp: exp.getTime() / 1000,
			},
			secretToken
		)
	}
}
