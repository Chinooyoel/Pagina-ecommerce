import Encryption from '../../utils/encryption';
import HTTPResponseError from '../../utils/httpReponseError';
import UsersService from '../users/UsersService';
import Token from '../../utils/token';
import { HTTP_CODE } from '../../utils/const';

export default class AuthService {
	static async login ({email, password}: {email: string, password: string}) {
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
		const token = Token.create({ email: user.email, role: user.rol }, 24);

		return token;
	}
}