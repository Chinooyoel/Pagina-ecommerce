import { Request, Response } from 'express';

import HTTPResponseError from '../../utils/httpReponseError';
import UsersService from './UsersService';
import { validationResult } from 'express-validator';
import { HTTP_CODE } from '../../utils/const';
import { UserData } from '../../@types';

export default class UsersController {

	static async createUser (req: Request, res: Response) {
		//validamos los campos con express-validator
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// throw new HTTPResponseError(HTTP_CODE.BadRequest, errors.array().join('\n') );
			return res.status(400).json({ errores: errors.array() });
		}
	
		try{ 	
			const user = await UsersService.createUser(req.body, req.admin);
			// return res.json({
			// 	message: 'Created',
			// 	data: user
			// });
			res.json({
				ok: true
			});
		
		} catch (error) {
			console.error(error);
			// if( error instanceof HTTPResponseError)
			// 	return res.status(error.code).json({message: error.message});
			// if (error instanceof Error)
			// 	return res.status(500).json({message: error.message});
			return res.status(500).json({
				ok: false,
				msj: 'Error interno',
				error
			});
		}
	}
	
	static async updateUser (req: Request, res: Response) {
		try {
			const userData = {
				id: Number(req.params.id),
				user: req.body,
				idUserLogged: Number(req.user.idusuario),
				adminPermissions: req.admin
			};
			const userUpdated = UsersService.updateUser(userData);
	
			res.redirect(`/usuario/perfil/${userData.id}`);
			// return res.json({message: 'Updated', data: userUpdated});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				error,
			});
			// if( error instanceof HTTPResponseError)
			// 	return res.status(error.code).json({message: error.message});
			// if (error instanceof Error)
			// 	return res.status(500).json({message: error.message});
		}
	}
	
	static async findUsersByEmail (req: Request, res: Response) {
		const { email } = req.params;
		try {
			const users = UsersService.findUsersByEmail(email);
			res.json({
				usuarios: users,
			});
			// res.json({data:users});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				ok: false,
				error,
			});
			// if( error instanceof HTTPResponseError)
			// 	return res.status(error.code).json({message: error.message});
			// if (error instanceof Error)
			// 	return res.status(500).json({message: error.message});
		}
	}
	
	static async findUserByIdWithTheirOrders (req: Request, res: Response) {
		const userData : UserData = {
			id: Number(req.params.id),
			idUserLogged: Number(req.usuario.idusuario),
			adminPermissions: req.admin
		};
	
		try {
			const user = await UsersService.findUserByIdWithTheirOrders(userData);
			res.render('cuentaUsuario', {
				usuario: req.usuario,
				usuarioPerfil: user,
				pedidos: user.pedidos,
			});
			// return res.json({data:user});
		} catch (error) {
			console.error(error);
			if( error instanceof HTTPResponseError)
				return res.status(error.code).json({message: error.message});
			if (error instanceof Error)
				return res.status(500).json({message: error.message});
		}
	}

}