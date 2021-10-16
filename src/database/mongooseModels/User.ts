import mongoose from 'mongoose'
import { IUser } from '../../interfaces/IUser'

const userSchema = new mongoose.Schema(
	{
		name: String,
		email: String,
	},
	{ timestamps: true }
)

export default mongoose.model<IUser & mongoose.Document>('User', userSchema)
