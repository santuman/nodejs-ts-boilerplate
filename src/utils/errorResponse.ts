export default class ErrorResponse extends Error {
	statusCode: number
	messages: Array<string>
	constructor(messages: Array<string>, statusCode: number) {
		super()
		this.messages = messages
		this.statusCode = statusCode
	}
}
