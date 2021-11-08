import mongoose from 'mongoose'

import { IUser } from 'interfaces/IUser'

const userSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			unique: [true, 'Username already taken'],
			required: [true, 'Please enter a username'],
		},
		firstName: {
			type: String,
			trim: true,
			required: [true, 'Please enter a first name'],
		},
		lastName: {
			type: String,
			required: [true, 'Please enter a last name'],
		},
		email: {
			type: String,
			lowercase: true,
			unique: true,
			required: [true, 'Email address is required'],
			min: 4,
			max: 25,
		},
		password: {
			type: String,
			required: true,
			min: 6,
			max: 255,
		},
		role: {
			type: String,
			default: 'user',
		},
		emailConfirmed: {
			type: Boolean,
			default: false,
		},
		emailToken: {
			type: String,
		},
		security: {
			// password salt
			salt: {
				type: String,
				required: true,
			},
			// all the history of refresh tokens
			tokens: [
				{
					refreshToken: String,
					createdAt: Date,
				},
			],
			passwordReset: {
				token: {
					type: String,
					default: null,
				},
				expiry: {
					type: Date,
					default: null,
				},
			},
			select: false,
		},
	},
	{
		timestamps: true,
		toObject: {
			transform: function (_doc, ret) {
				Reflect.deleteProperty(ret, 'password')
				Reflect.deleteProperty(ret, 'security')
				Reflect.deleteProperty(ret, 'emailToken')
				Reflect.deleteProperty(ret, 'createdAt')
				Reflect.deleteProperty(ret, 'updatedAt')
				Reflect.deleteProperty(ret, '__v')
			},
		},
	}
)

const userMongooseModel = mongoose.model<IUser & mongoose.Document>('User', userSchema)

export default userMongooseModel
