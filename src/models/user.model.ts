import userMongooseModel from '../database/mongooseModels/User'
import { IUserInputDTO } from '../interfaces/IUser'

interface UserData extends IUserInputDTO {
	salt: string
	password: string
}
const create = async (userData: UserData) => {
	return await userMongooseModel.create(userData)
}

const UserModel = {
	create,
}

// Container.set('userModel', UserModel)

export type UserModelType = typeof UserModel

export default UserModel
