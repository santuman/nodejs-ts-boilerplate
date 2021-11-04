import { IUser } from './IUser'

export interface GenerateTokenParams {
	type: 'ACCESS' | 'REFRESH'
	user: IUser
}
