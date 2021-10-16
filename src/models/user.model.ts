import User from '../database/mongooseModels/User'
import { IUserInputDTO } from '../interfaces/IUser'

const create = (userInputDto: IUserInputDTO) => {
	return User.create(userInputDto)
}

const UserModel = {
	create,
}

export default UserModel
