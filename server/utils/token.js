const jwt = require('jsonwebtoken');
const { semilla } = require('../config/config');

class Token {

	static create(body, durationHours) {
		//creamos el token
		let token = jwt.sign(
			{
				email: body.email,
				role: body.rol,
			},
			semilla,
			{ expiresIn: 60 * 60 * durationHours * 30 }
		);

		return token;
	}

	static isValid(token) {
        
	}
}

exports.module = Token;