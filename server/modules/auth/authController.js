const { validationResult } = require('express-validator');
const { HTTP_CODE } = require('../../utils/const');
const HTTPResponseError = require('../../utils/httpReponseError');
const AuthService = require('./authService');

class AuthController {
	static async login (req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throw new HTTPResponseError(HTTP_CODE.BadRequest, errors.array().join('\n') );
		}
    
		try {
			let token = AuthService.login(req.body);
			res.json({
				message: 'Credentials ok',
				token,
			});
		} catch (error) {
			console.error(error);
			if( error instanceof HTTPResponseError)
				return res.status(error.code).json({message: error.message});
			return res.status(500).json({message: error.message});
		}
	}

}

module.exports = AuthController;