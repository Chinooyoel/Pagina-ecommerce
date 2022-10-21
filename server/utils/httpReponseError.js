class HTTPResponseError extends Error {
	code;
	constructor(code, message = '', ...args) {
		super(message, ...args);
		this.code = code;
	}
}

module.exports = HTTPResponseError;