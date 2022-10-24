import { Op } from 'sequelize';
import { UserWithOrders } from '../../@types';
import Usuarios = require('../../models/Usuarios');
import UserDTO from './UserDTO';

export default class UsersRepository {
	static async findByEmail(email: string) {
		return await Usuarios.findOne({attributes: { exclude: 'password' }, where: {email: email}});
	}

	static async findUsersByEmail(email: string){
		return await Usuarios.findAll({
			attributes: { exclude: 'password' },
			where: {
				[Op.and] : [
					{ email: { [Op.substring]: email }},
				]
			},
		});
	}

	static async findUserByIdWithTheirOrders(id: number): Promise<UserWithOrders>{
		return await Usuarios.findOne({
			where: { idusuario: id },
			attributes: { exclude: 'password' },
			//TODO: search orders
			//buscamos los pedidos por el id del usuario en la URL
			// const pedidos = await Pedidos.findAll({
			// 	where: { usuario_id: idUsuarioURL },
			// 	order: [['fecha', 'DESC']],
			// 	include: {
			// 		model: Estado,
			// 	},
			// });
		});
	}

	static async create(user: UserDTO) {
		const userDB = new Usuarios(user);
		return userDB.save();
	}

	static async update(id: number, user: UserDTO) {
		return await Usuarios.update(user, { where: { idusuario: id } });
	}

}