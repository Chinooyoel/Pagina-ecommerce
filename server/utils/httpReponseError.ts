export default class HTTPResponseError extends Error {
	code;
	constructor(code:number, message = '') {
		super(message);
		this.code = code;
	}
}