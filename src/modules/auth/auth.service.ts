import { Inject, Service } from 'typedi'
import { randomBytes } from 'crypto'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { IUser, IUserInputDTO } from '../../interfaces/IUser'
import { LoggerInstanceType } from '../../loaders/logger'
import { UserModelType } from '../../models/user.model'
// import NodeMailerService from '../../services/mailer'
import keys from '../../config/keys'

@Service()
export default class AuthService {
	constructor(
		@Inject('userModel') private userModel: UserModelType,
		// private _mailer: NodeMailerService,
		@Inject('logger') private logger: LoggerInstanceType
	) {}

	public async signup(userInputDto: IUserInputDTO) {
		console.log(userInputDto)
		const salt = randomBytes(20)

		this.logger.silly('Hashing password')
		const hashedPassword = await argon2.hash(userInputDto.password, { salt })

		this.logger.silly('Creating user db record')
		const userRecord = await this.userModel.create({
			...userInputDto,
			salt: salt.toString('hex'),
			password: hashedPassword,
		})

		if (!userRecord) {
			throw new Error('User cannot be created')
		}

		this.logger.silly('Generating JWT')
		const token = this.generateToken(userRecord)

		// this.logger.silly('Sending welcome email')
		// await this.mailer.SendWelcomeEmail()

		const user = userRecord.toObject()
		Reflect.deleteProperty(user, 'password')
		Reflect.deleteProperty(user, 'salt')
		return {
			user,
			token,
		}
	}

	private generateToken(user: IUser) {
		const today = new Date()
		const exp = new Date(today)
		exp.setDate(today.getDate() + 60) // expires in 60 days

		this.logger.silly(`Sign JWT for userId: ${user._id}`)
		return jwt.sign(
			{
				_id: user._id,
				role: user.role,
				username: user.userName,
				exp: exp.getTime() / 1000,
			},
			keys.JWT.SECRET
		)
	}
}
