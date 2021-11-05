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
		await this.userModel.pushTokens(userRecord._id, {
			token: refreshToken,
			createdAt: new Date(),
		})

		this.logger.silly('Sending confirmation email')
		await this.mailer.SendConfirmationEmail(userRecord.email, userRecord.emailToken)

		const user = userRecord.toObject()
		Reflect.deleteProperty(user, 'password')
		Reflect.deleteProperty(user, 'security')
		Reflect.deleteProperty(user, 'emailToken')
		Reflect.deleteProperty(user, '_id')
		Reflect.deleteProperty(user, 'createdAt')
		Reflect.deleteProperty(user, 'updatedAt')
		Reflect.deleteProperty(user, '__v')
		return {
			user,
			accessToken,
			refreshToken,
		}
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
		if (!user) throw new ErrorResponse(['Bad Request'], 400)

		// Check if email is already confirmed
		if (user.emailConfirmed) throw new ErrorResponse(['Email is already confirmed'], 401)

		// Check if provided email token matches user's email
		if (emailToken !== user.emailToken) {
			throw new ErrorResponse(['Invalid Email token'], 401)
		}
		await this.userModel.updateEmailToken(user._id)
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
