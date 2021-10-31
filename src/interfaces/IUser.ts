export interface IUser {
	_id: string
	userName: string
	firstName: string
	lastName: string
	email: string
	role: string
}

export interface IUserInputDTO {
	userName: string
	firstName: string
	lastName: string
	email: string
	password: string
}
