import { Op } from 'sequelize'
import { User, UserAttributes } from '../models/init-models'
import { NotFound } from '../utils/errors'

export default class UsersRepository {
	static async findUserByEmail(email: string) {
		return await User.findOne({
			attributes: { exclude: ['password'] },
			where: { email: email },
		})
	}

	static async findUsersByEmail(email: string) {
		return await User.findAll({
			attributes: { exclude: ['password'] },
			where: {
				[Op.and]: [
					{ email: { [Op.substring]: email } },
					{ role: { [Op.ne]: 'ADMIN' } },
				],
			},
		})
	}

	static async findUserById(id: number) {
		return await User.findOne({
			attributes: { exclude: ['password'] },
			where: {
				[Op.and]: [{ userId: id }, { role: { [Op.ne]: 'ADMIN' } }],
			},
		})
	}

	static async findUserByIdWithTheirOrders(id: number) {
		return await User.findOne({
			where: { userId: id },
			attributes: { exclude: ['password'] },
			//TODO: search orders
			//buscamos los pedidos por el id del usuario en la URL
			// const pedidos = await Pedidos.findAll({
			// 	where: { usuario_id: idUsuarioURL },
			// 	order: [['fecha', 'DESC']],
			// 	include: {
			// 		model: Estado,
			// 	},
			// });
		})
	}

	static async createUser(user: UserAttributes) {
		const userDB = new User(user)
		return userDB.save()
	}

	static async updateUserById(id: number, user: User) {
		const result = await User.update(user, {
			where: { userId: id },
			returning: true,
			limit: 1,
		})
		return result[1][0]
	}

	static async updateUserRole(
		id: number,
		role: 'USUARIO' | 'ADMIN' | 'ESPECTADOR',
	) {
		const result = await User.update(
			{ role },
			{ where: { userId: id }, returning: true, limit: 1 },
		)
		if (!result[0]) throw new NotFound('User not found')
		return result[1][0]
	}
}
