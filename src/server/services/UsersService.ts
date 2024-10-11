import UsersRepository from '../repository/UsersRepository'
import { UserData, UserDataWithUser } from '../@types'
import Password from '../utils/password'
import { User } from '../models/init-models'
import { BusinessError, NotFound, NotPermissions } from '../utils/errors'

export default class UsersService {
	static async findUserByEmail(email: string) {
		return await UsersRepository.findUserByEmail(email)
	}

	static async findUsersByEmail(email: string) {
		return await UsersRepository.findUsersByEmail(email)
	}

	static async findUserById(id: number) {
		return await UsersRepository.findUserById(id)
	}

	static async findUserByIdWithTheirOrders(userData: UserData) {
		if (userData.id !== userData.idUserLogged && !userData.adminPermissions) {
			throw new NotPermissions()
		}
		const userWithOrders = await UsersRepository.findUserByIdWithTheirOrders(
			userData.id,
		)
		return userWithOrders
	}

	static async createUser(user: User, adminPermissions: boolean) {
		//si el admin esta loguiado sino que el admin esta registrando un vendedor
		// if(user.rol !== 'USUARIO' && adminPermissions)
		// 	throw new HTTPResponseError(HTTP_CODE.Forbidden, 'Not permissions');
		const userFound = await UsersRepository.findUserByEmail(user.email)
		if (!userFound)
			throw new BusinessError('There is already a user with this email')
		if (!user.password) throw new BusinessError('The password is required')
		user.password = Password.hash(user.password)
		return await UsersRepository.createUser(user)
	}

	static async updateUserById(userData: UserDataWithUser) {
		if (userData.id !== userData.idUserLogged && !userData.adminPermissions)
			throw new NotPermissions()
		const updatedUser = await UsersRepository.updateUserById(
			userData.id,
			userData.user,
		)
		if (!updatedUser) throw new NotFound('User not found')
		return updatedUser
	}

	static async updateUserRole(
		id: number,
		role: 'USUARIO' | 'ADMIN' | 'ESPECTADOR',
	) {
		const updatedUser = await UsersRepository.updateUserRole(id, role)
		if (!updatedUser) throw new NotFound('User not found')
		return updatedUser
	}
}
