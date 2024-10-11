export class NotFound extends Error {
	constructor(message = 'NOT_FOUND') {
		super(message)
	}
}

export class InvalidCredential extends Error {
	constructor(message = 'INVALID_CREDENTIAL') {
		super(message)
	}
}

export class ExpiredToken extends Error {
	constructor(message = 'EXPIRED_TOKEN') {
		super(message)
	}
}

export class BusinessError extends Error {
	constructor(message = 'BUSINESS_ERROR') {
		super(message)
	}
}

export class NotPermissions extends Error {
	constructor(message = 'NOT_PERMISSIONS') {
		super(message)
	}
}
