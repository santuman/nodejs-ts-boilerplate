import mongoose from 'mongoose'
import { IUser } from '../../interfaces/IUser'

const userSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			unique: true,
			required: [true, 'Please enter a username'],
		},
		firstName: {
			type: String,
			required: [true, 'Please enter a first name'],
		},
		lastName: {
			type: String,
			required: [true, 'Please enter a last name'],
		},
		email: {
			type: String,
			lowercase: true,
			required: [true, 'Email is required'],
			unique: true,
		},
		password: String,
		salt: String,
		role: {
			type: String,
			default: 'user',
		},
	},
	{ timestamps: true }
)

const userMongooseModel = mongoose.model<IUser & mongoose.Document>('User', userSchema)

export default userMongooseModel
