const UsersService = require('../users/UsersService');
const { HTTP_CODE } = require('../../utils/const');
const Encryption = require('../../utils/encryption');
const Token = require('../../utils/token');
const HTTPResponseError = require('../../utils/httpReponseError');

class AuthService {
	static async login ({email, password}) {
		//buscamos el usuario
		const user = await UsersService.findByEmail(email);

		//comprobamos que existe el usuario
		if (user === null) 
			throw new HTTPResponseError(HTTP_CODE.Unauthorized, 'Credentials invalid' );

		//comprobamos si el usuario esta bloqueado
		// if( usuarioDB.estado === 'I' ){
		//     return res.status(400)
		//     .json({
		//         message: "Usuario bloqueado",
		//     })
		// }

		//comparamos las password
		if (Encryption.isValid(password, user.password)) 
			throw new HTTPResponseError(HTTP_CODE.Unauthorized, 'Credentials invalid' );

		//creamos el token
		let token = Token.create({ email: user.email, role: user.rol }, 24);

		return token;
	}
}

module.exports = AuthService;