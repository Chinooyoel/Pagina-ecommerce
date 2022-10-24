import UsersRepository from './UsersRepository';
import HTTPResponseError from '../../utils/httpReponseError';
import Encryption from '../../utils/encryption';
import { HTTP_CODE } from '../../utils/const';
import UserDTO from './UserDTO';
import { UserData, UserDataWithUser, UserWithOrders } from '../../@types';

export default class UsersService {
	static async findByEmail (email:string) {
		return await UsersRepository.findByEmail(email);
	}

	static async findUsersByEmail (email:string) {
		//buscamos los usuarios que tengan la palabra en el email
		return await UsersRepository.findUsersByEmail(email);
	}

	static async findUserByIdWithTheirOrders(userData: UserData): Promise<UserWithOrders>{
		//si el usuario que esta loguiado no es el admin y tampoco coincide el id del usuario loguiado con el que quiere buscar
		// no va a tener permiso para ver el perfil
		if(  userData.id !== userData.idUserLogged && !userData.adminPermissions){
			throw new HTTPResponseError(HTTP_CODE.Forbidden, 'Not permissions');
		}

		const userFound = await UsersRepository.findUserByIdWithTheirOrders(userData.id);

		return userFound;
	}

	static async createUser ( user: UserDTO, adminPermissions: boolean ) {
		//si el admin esta loguiado sino que el admin esta registrando un vendedor
		if(user.rol !== 'USUARIO' && adminPermissions)
			throw new HTTPResponseError(HTTP_CODE.Forbidden, 'Not permissions');
		

		//hasheamos la password
		user.password = Encryption.encrypt(user.password);

		//chequiamos que no exista un usuario con ese email
		const userFound = await UsersRepository.findByEmail(user.email);

		if( !userFound )
			throw new HTTPResponseError(HTTP_CODE.BadRequest, 'Email exists');

		
		//guardamos el usuario en la DB
		return await UsersRepository.create(user);
	}

	static async updateUser ( userData: UserDataWithUser) {
		if( userData.id !== userData.idUserLogged && !userData.adminPermissions)
			throw new HTTPResponseError(HTTP_CODE.Forbidden, 'Not permissions');

		return await UsersRepository.update(userData.id, userData.user);
	}
}

