const { validationResult } = require('express-validator');
const HTTPResponseError = require('../../utils/httpReponseError');
const { HTTP_CODE } = require('../../utils/const');
const UsersService = require('./UsersService');


exports.createUser = async (req, res) => {
	//validamos los campos con express-validator
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		throw new HTTPResponseError(HTTP_CODE.BadRequest, errors.array().join('\n') );
	}

	try{ 	
		const user = await UsersService.createUser(req.body, req.admin);
		res.json({
			message: 'Created',
			data: user
		});
    
	} catch (error) {
		console.error(error);
		if( error instanceof HTTPResponseError)
			return res.status(error.code).json({message: error.message});
		return res.status(500).json({message: error.message});
	}
};

exports.updateUser = async (req, res) => {
	try {
		let userData = {
			id: req.params.id,
			user: req.body,
			idUserLogged: req.user.id,
			adminPermissions: req.admin
		};
		let userUpdated = UsersService.updateUser(userData);

		return res.json({message: 'Updated', data: userUpdated});
	} catch (error) {
		console.error(error);
		if( error instanceof HTTPResponseError)
			return res.status(error.code).json({message: error.message});
		return res.status(500).json({message: error.message});
	}
};

exports.findUsersByEmail = async (req, res) => {
	const { email } = req.params;
	try {
		const users = UsersService.findUsersByEmail(email);
		res.json({data:users});
	} catch (error) {
		console.error(error);
		if( error instanceof HTTPResponseError)
			return res.status(error.code).json({message: error.message});
		return res.status(500).json({message: error.message});
	}
};

exports.findUserByIdWithTheirOrders = async (req, res) => {
	let userData = {
		id: req.params.id,
		idUserLogged: req.usuario.idusuario,
		adminPermissions: req.admin
	};

	try {
		const user = UsersService.findUserByIdWithTheirOrders(userData);
		return res.json({data:user});
	} catch (error) {
		console.error(error);
		if( error instanceof HTTPResponseError)
			return res.status(error.code).json({message: error.message});
		return res.status(500).json({message: error.message});
	}
};