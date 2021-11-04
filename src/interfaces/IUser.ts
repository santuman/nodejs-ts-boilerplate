export interface IUser {
	_id: string
	userName: string
	firstName: string
	lastName: string
	email: string
	emailConfirmed: boolean
	emailToken: string
	role: string
	security: {
		tokens: Array<{ refreshToken: string; createdAt: Date }>
		passwordReset: {
			token: string
			provisionalPassword: string
			expiry: Date
		}
	}
}

export interface IUserInputDTO {
	userName: string
	firstName: string
	lastName: string
	email: string
	password: string
}
