import User from '../database/mongooseModels/User'
import { IUserInputDTO } from '../interfaces/IUser'

const createUser = (userInputDto: IUserInputDTO) => {
	return User.create(userInputDto)
}

export { createUser }
