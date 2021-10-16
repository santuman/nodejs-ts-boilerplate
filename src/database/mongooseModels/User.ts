import mongoose from 'mongoose'
import { IUser } from '../../interfaces/IUser'

const userSchema = new mongoose.Schema(
	{
		name: String,
		email: String,
	},
	{ timestamps: true }
)

const userMongooseModel = mongoose.model<IUser & mongoose.Document>('User', userSchema)

export default userMongooseModel
