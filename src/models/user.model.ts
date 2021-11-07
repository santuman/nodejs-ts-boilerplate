import userMongooseModel from '../database/mongooseModels/user.mongo'
import { IUserInputDTO } from '../interfaces/IUser'

interface UserData extends IUserInputDTO {
	emailToken: string
	security: {
		salt: string
		tokens: Array<{
			refreshToken: string
			createdAt: Date
		}>
	}
	password: string
}

interface PasswordResetData {
	token: string
	expiry: Date
}

const create = async (userData: UserData) => {
	return await userMongooseModel.create(userData)
}

const findById = async (_id: string) => {
	return await userMongooseModel.findById(_id)
}

const findByEmail = async (email: string) => {
	return await userMongooseModel.findOne({ email })
}

const pushRefreshTokens = async (_id: string, data: { token: string; createdAt: Date }) => {
	return await userMongooseModel.updateOne(
		{ _id },
		{
			$push: { 'security.tokens': { refreshToken: data.token, createdAt: data.createdAt } },
		}
	)
}

const removeRefreshToken = async (userId: string, refreshTokenId: string) => {
	return await userMongooseModel.updateOne(
		{ _id: userId },
		{
			$pull: { 'security.tokens': { _id: refreshTokenId } },
		}
	)
}

const updateEmailToken = async (_id: string) => {
	await userMongooseModel.updateOne(
		{ _id },
		{
			$set: { emailConfirmed: true, emailToken: null },
		}
	)
}

const updatePasswordReset = async (_id: string, passwordResetData: PasswordResetData) => {
	await userMongooseModel.findOneAndUpdate(
		{ _id },
		{
			$set: { 'security.passwordReset': passwordResetData },
		}
	)
}

const updatePassword = async (_id: string, provisionalPassword: string) => {
	await userMongooseModel.updateOne(
		{ _id },
		{
			$set: {
				password: provisionalPassword,
				'security.passwordReset.token': null,
				'security.passwordReset.expiry': null,
			},
		}
	)
}

const clearPasswordReset = async (userId: string) => {
	await userMongooseModel.updateOne(
		{ _id: userId },
		{
			$set: {
				'security.passwordReset.token': null,
				'security.passwordReset.provisionalPassword': null,
				'security.passwordReset.expiry': null,
			},
		}
	)
}

const UserModel = {
	create,
	findById,
	findByEmail,
	pushRefreshTokens,
	removeRefreshToken,
	updateEmailToken,
	updatePasswordReset,
	updatePassword,
	clearPasswordReset,
}

// Container.set('userModel', UserModel)

export type UserModelType = typeof UserModel

export default UserModel
