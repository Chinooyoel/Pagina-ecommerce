import Password from '../utils/password'
import UsersService from './UsersService'
import Token from '../utils/token'
import { InvalidCredential } from '../utils/errors'

export default class AuthService {
	static async login({ email, password }: { email: string; password: string }) {
		const user = await UsersService.findUserByEmail(email)
		if (!user) throw new InvalidCredential()
		//comprobamos si el usuario esta bloqueado
		// if( usuarioDB.estado === 'I' ){
		//     return res.status(400)
		//     .json({
		//         message: "Usuario bloqueado",
		//     })
		// }
		if (Password.isValid(password, user.password)) throw new InvalidCredential()
		const token = Token.create(
			{ email: user.email, role: user.role ?? 'USER' },
			24,
		)
		return token
	}
}
