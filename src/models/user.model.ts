import userMongooseModel from '../database/mongooseModels/User'
import { IUserInputDTO } from '../interfaces/IUser'

const create = (userInputDto: IUserInputDTO) => {
	return userMongooseModel.create(userInputDto)
}

const UserModel = {
	create,
}

export default UserModel
