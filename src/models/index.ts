import UserModel from './user.model'

const models = [
	{
		name: 'userModel',
		model: UserModel,
	},
]

export type Models = typeof models

export default models
