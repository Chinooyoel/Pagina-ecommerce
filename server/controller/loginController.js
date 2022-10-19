const UsersService = require('../services/users');
const Token = require('../utils/token');
const Encryption = require('../utils/encryption');
const { validationResult } = require('express-validator');

exports.login = async (req, res) => {
	//validamos los campos con express-validator
	const errores = validationResult(req);
	if (!errores.isEmpty()) {
		return res.status(400).json({ errores: errores.array() });
	}
  
	const { email, password } = req.body;

	try {
		//buscamos el usuario
		const user = await UsersService.findByEmail(email);

		//comprobamos que existe el usuario
		if (user === null) {
			return res.status(400).json({
				errores: [
					{ msg: 'Los datos ingresados son invalidos' }
				]
			});
		}

		//comprobamos si el usuario esta bloqueado
		// if( usuarioDB.estado === 'I' ){
		//     return res.status(400)
		//     .json({
		//         message: "Usuario bloqueado",
		//     })
		// }

		//comparamos las password
		if (Encryption.isValid(password, user.password)) {
			return res.status(400).json({
				errores: [
					{ msg: 'Los datos ingresados son invalidos' }
				]
			});
		}

		//creamos el token
		let token = Token.create({
			email: user.email,
			role: user.rol,
		},24);

		res.json({
			message: 'Credenciales validas',
			token,
		});
	} catch (error) {
		console.log(error);
	}
};
