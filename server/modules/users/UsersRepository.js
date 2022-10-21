const { Op } = require('sequelize');
const Users = require('../../models/Usuarios');

class UsersRepository {
	static async findByEmail(email) {
		return await Users.findOne({attributes: { exclude: 'password' }, where: {email: email}});
	}

	static async findUsersByEmail(email){
		return await Users.findAll({
			attributes: { exclude: 'password' },
			where: {
				[Op.and] : [
					{ email: { [Op.substring]: email }},
				]
			},
		});
	}

	static async findUserByIdWithTheirOrders(id){
		return await Users.findOne({
			where: { id },
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

	static async create(user) {
		let userDB = new Users(user);
		return userDB.save();
	}

	static async update(id, user) {
		return await Users.update(user, { where: { id } });
	}

}

module.exports = UsersRepository;