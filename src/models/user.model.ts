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
const create = async (userData: UserData) => {
	return await userMongooseModel.create(userData)
}

const findById = async (_id: string) => {
	return await userMongooseModel.findOne(
		{ _id },
		{
			__id: 0,
			__v: 0,
		}
	)
}

const findByEmail = async (email: string) => {
	return await userMongooseModel.findOne(
		{ email },
		{
			__id: 0,
			__v: 0,
		}
	)
}

const pushTokens = async (_id: string, data: { token: string; createdAt: Date }) => {
	return await userMongooseModel.updateOne(
		{ _id },
		{
			$push: { 'security.tokens': { refreshToken: data.token, createdAt: data.createdAt } },
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

const UserModel = {
	create,
	findById,
	findByEmail,
	pushTokens,
	updateEmailToken,
}

// Container.set('userModel', UserModel)

export type UserModelType = typeof UserModel

export default UserModel
